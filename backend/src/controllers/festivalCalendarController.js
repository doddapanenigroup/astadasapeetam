const FestivalCalendar = require('../models/FestivalCalendar');

// Get all festival calendar entries with optional month & search filters
exports.getFestivalEvents = async (req, res) => {
  try {
    const { month, search, isMajor } = req.query;
    let query = { status: 'active' };

    if (month && month !== 'all') {
      query.$or = [
        { month: new RegExp(month, 'i') },
        { monthShort: new RegExp(month, 'i') },
        { date: new RegExp(month, 'i') }
      ];
    }

    if (isMajor !== undefined) {
      query.isMajor = isMajor === 'true';
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { teluguName: new RegExp(search, 'i') },
        { sanskritName: new RegExp(search, 'i') },
        { deity: new RegExp(search, 'i') },
        { tithi: new RegExp(search, 'i') }
      ];
    }

    const events = await FestivalCalendar.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: events.length, data: events });
  } catch (error) {
    console.error('Error fetching festival events:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching festival events' });
  }
};

// Get single festival event by ID or slug
exports.getFestivalEventById = async (req, res) => {
  try {
    const event = await FestivalCalendar.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Festival event not found' });
    }
    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create new festival calendar event
exports.createFestivalEvent = async (req, res) => {
  try {
    const {
      name,
      sanskritName,
      teluguName,
      date,
      day,
      month,
      monthShort,
      year,
      tithi,
      hinduMonth,
      deity,
      pujaTime,
      fastingType,
      image,
      summary,
      pujaVidhi,
      mantra,
      significance,
      categories,
      isMajor
    } = req.body;

    if (!name || !date) {
      return res.status(400).json({ success: false, message: 'Festival Name and Date are required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newEvent = new FestivalCalendar({
      name,
      sanskritName: sanskritName || '',
      teluguName: teluguName || '',
      slug,
      date,
      day: day || '',
      month: month || 'JAN',
      monthShort: monthShort || (month ? month.slice(0, 3).toUpperCase() : 'JAN'),
      year: year || 2026,
      tithi: tithi || '',
      hinduMonth: hinduMonth || '',
      deity: deity || '',
      pujaTime: pujaTime || '',
      fastingType: fastingType || '',
      image: image || '/images/fest_ugadi.png',
      summary: summary || '',
      pujaVidhi: pujaVidhi || '',
      mantra: mantra || '',
      significance: significance || '',
      categories: categories || ['major-mahotsavams', 'all'],
      isMajor: isMajor !== undefined ? isMajor : true,
      status: 'active'
    });

    const savedEvent = await newEvent.save();
    res.status(201).json({ success: true, data: savedEvent });
  } catch (error) {
    console.error('Error creating festival event:', error);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// Update existing festival calendar event
exports.updateFestivalEvent = async (req, res) => {
  try {
    const updated = await FestivalCalendar.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Festival event not found' });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete festival calendar event
exports.deleteFestivalEvent = async (req, res) => {
  try {
    const deleted = await FestivalCalendar.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Festival event not found' });
    }
    res.json({ success: true, message: 'Festival event deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
