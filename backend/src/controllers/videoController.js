const Video = require('../models/Video');

// Helper to convert YouTube URL to embed URL and extract thumbnail
const parseYouTubeUrl = (url = '') => {
  if (!url) return { embedUrl: '', thumbnail: '' };
  
  let videoId = '';
  // Match youtube.com/watch?v=ID or youtu.be/ID or youtube.com/embed/ID or live_stream
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  
  if (match && match[1]) {
    videoId = match[1];
    return {
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    };
  }
  
  // If it's already an embed URL
  if (url.includes('youtube') && url.includes('embed')) {
    return { embedUrl: url, thumbnail: '' };
  }

  return { embedUrl: url, thumbnail: '' };
};

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
exports.getVideos = async (req, res, next) => {
  try {
    const { category, isLatest, search, limit } = req.query;
    let query = { status: 'published' };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (isLatest === 'true' || isLatest === '1') {
      query.isLatestVideo = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { titleTelugu: { $regex: search, $options: 'i' } },
        { temple: { $regex: search, $options: 'i' } },
        { speakerOrArtist: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const videos = await Video.find(query)
      .sort({ createdAt: -1 })
      .limit(limit ? Number(limit) : 100);

    res.status(200).json({
      success: true,
      count: videos.length,
      data: videos
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single video
// @route   GET /api/videos/:id
// @access  Public
exports.getVideoById = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    video.viewsCount = (video.viewsCount || 0) + 1;
    await video.save();

    res.status(200).json({ success: true, data: video });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new video
// @route   POST /api/videos
// @access  Public / Protected
exports.createVideo = async (req, res, next) => {
  try {
    const {
      title,
      titleTelugu,
      category,
      videoUrl,
      thumbnail,
      subtitle,
      temple,
      speakerOrArtist,
      duration,
      description,
      isLatestVideo,
      isLive,
      status,
      tags,
      authorName
    } = req.body;

    const ytParsed = parseYouTubeUrl(videoUrl);
    const finalEmbedUrl = req.body.embedUrl || ytParsed.embedUrl || videoUrl;
    const finalThumbnail = thumbnail || ytParsed.thumbnail || '/images/temple_tirupati.jpg';

    const video = await Video.create({
      title,
      titleTelugu,
      category: category || 'devotional-videos',
      videoUrl,
      embedUrl: finalEmbedUrl,
      thumbnail: finalThumbnail,
      subtitle: subtitle || 'Devotional Video',
      temple,
      speakerOrArtist,
      duration: duration || '10:00',
      description,
      isLatestVideo: isLatestVideo !== undefined ? Boolean(isLatestVideo) : true,
      isLive: Boolean(isLive),
      status: status || 'published',
      tags: Array.isArray(tags) ? tags : ['Devotional', 'Vedic'],
      authorName: authorName || (req.user ? req.user.name : 'Sri Astadasapeetam Editor')
    });

    res.status(201).json({
      success: true,
      message: 'Video published successfully',
      data: video
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update video
// @route   PUT /api/videos/:id
// @access  Public / Protected
exports.updateVideo = async (req, res, next) => {
  try {
    let video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    if (req.body.videoUrl && req.body.videoUrl !== video.videoUrl) {
      const ytParsed = parseYouTubeUrl(req.body.videoUrl);
      if (!req.body.embedUrl && ytParsed.embedUrl) {
        req.body.embedUrl = ytParsed.embedUrl;
      }
      if (!req.body.thumbnail && ytParsed.thumbnail) {
        req.body.thumbnail = ytParsed.thumbnail;
      }
    }

    video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Video updated successfully',
      data: video
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete video
// @route   DELETE /api/videos/:id
// @access  Public / Protected
exports.deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ success: false, message: 'Video not found' });
    }

    await video.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Video removed successfully'
    });
  } catch (err) {
    next(err);
  }
};
