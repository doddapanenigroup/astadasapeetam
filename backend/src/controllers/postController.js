const Post = require('../models/Post');

// @desc    Get all posts with filters
// @route   GET /api/posts
// @access  Public
exports.getPosts = async (req, res, next) => {
  try {
    const { category, status, search, limit } = req.query;
    let query = {};

    if (category && category !== 'all') query.category = category;
    if (status && status !== 'all') query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { titleTelugu: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { deity: { $regex: search, $options: 'i' } }
      ];
    }

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit ? Number(limit) : 50);

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
// @access  Public
exports.getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    // Increment views
    post.viewsCount = (post.viewsCount || 0) + 1;
    await post.save();

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new post/article
// @route   POST /api/posts
// @access  Private (admin, digital_marketing, astrologer)
exports.createPost = async (req, res, next) => {
  try {
    const {
      title,
      titleTelugu,
      slug,
      category,
      excerpt,
      content,
      devotionalVerse,
      featuredImage,
      deity,
      tags,
      seoTitle,
      metaDescription,
      keywords,
      status
    } = req.body;

    const postSlug = slug 
      ? slug.toLowerCase().replace(/[^a-z0-9-]/g, '-')
      : title.toLowerCase().replace(/[^a-z0-9-]/g, '-').slice(0, 50) + '-' + Date.now().toString().slice(-4);

    const post = await Post.create({
      title,
      titleTelugu,
      slug: postSlug,
      category: category || 'temples',
      excerpt: excerpt || title,
      content,
      devotionalVerse,
      featuredImage: featuredImage || '/images/temple_kashi.jpg',
      deity: deity || 'Universal Mother Parashakti',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
      seoTitle: seoTitle || title,
      metaDescription: metaDescription || excerpt || title,
      keywords: Array.isArray(keywords) ? keywords : (keywords ? keywords.split(',').map(k => k.trim()) : []),
      status: status || 'published',
      author: req.user ? req.user._id : null,
      authorName: req.user ? req.user.name : 'Sri Astadasapeetam Editor'
    });

    res.status(201).json({
      success: true,
      message: `Sacred post '${post.title}' successfully published!`,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update post/article
// @route   PUT /api/posts/:id
// @access  Private (admin, digital_marketing, astrologer)
exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.status(200).json({
      success: true,
      message: `Post '${post.title}' updated successfully`,
      data: post
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete post/article
// @route   DELETE /api/posts/:id
// @access  Private (admin, digital_marketing)
exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    res.status(200).json({
      success: true,
      message: `Article '${post.title}' removed from repository`
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Generate Live XML RSS 2.0 Feed
// @route   GET /api/public/rss
// @access  Public
exports.getRssFeed = async (req, res, next) => {
  try {
    const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 }).limit(30);

    let rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Astadasapeetam.com — 18 Maha Shakti Peethas &amp; Vedic Dharma Feed</title>
  <link>http://localhost:3001</link>
  <description>Sacred Devotional Articles, Daily Panchangam, Sthala Puranams &amp; Temple News</description>
  <language>en-IN</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="http://localhost:5000/api/public/rss" rel="self" type="application/rss+xml" />
`;

    posts.forEach(p => {
      rssXml += `
  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>http://localhost:3001/articles/${p.slug}</link>
    <guid isPermaLink="false">${p._id}</guid>
    <pubDate>${new Date(p.createdAt).toUTCString()}</pubDate>
    <category>${p.category}</category>
    <description><![CDATA[${p.excerpt || p.content.slice(0, 200)}]]></description>
  </item>`;
    });

    rssXml += `
</channel>
</rss>`;

    res.set('Content-Type', 'application/xml');
    res.status(200).send(rssXml);
  } catch (err) {
    next(err);
  }
};

// @desc    Generate Live XML Sitemap
// @route   GET /api/public/sitemap
// @access  Public
exports.getSitemapXml = async (req, res, next) => {
  try {
    const posts = await Post.find({ status: 'published' }).sort({ createdAt: -1 });

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>http://localhost:3001/</loc>
    <priority>1.0</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>http://localhost:3001/sacred-temples</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>http://localhost:3001/temples</loc>
    <priority>0.9</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>http://localhost:3001/marketplace</loc>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
  <url>
    <loc>http://localhost:3001/yatralu</loc>
    <priority>0.8</priority>
    <changefreq>weekly</changefreq>
  </url>
  <url>
    <loc>http://localhost:3001/panchangam</loc>
    <priority>0.8</priority>
    <changefreq>daily</changefreq>
  </url>
`;

    posts.forEach(p => {
      sitemap += `
  <url>
    <loc>http://localhost:3001/articles/${p.slug}</loc>
    <lastmod>${new Date(p.updatedAt).toISOString().split('T')[0]}</lastmod>
    <priority>0.7</priority>
    <changefreq>monthly</changefreq>
  </url>`;
    });

    sitemap += `
</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.status(200).send(sitemap);
  } catch (err) {
    next(err);
  }
};
