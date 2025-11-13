// const { getFieldSpecificResponse, getFieldIntro } = require('../Utils/openaiService');

// Valid service fields
const validFields = ['websites-and-apps', 'ai-solutions', 'cloud-infrastructure', 'digital-marketing', 'general'];

// Get AI response for a specific field
const askAI = async (req, res) => {
  try {
    const { field, question } = req.body;

    // Validate input
    if (!field || !question) {
      return res.status(400).json({
        success: false,
        error: 'Field and question are required'
      });
    }

    // Validate field
    if (!validFields.includes(field)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid service field'
      });
    }

    // Validate question length
    if (question.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Question is too long. Please keep it under 500 characters.'
      });
    }

    // Get AI response
    const result = await getFieldSpecificResponse(field, question);

    // Send response
    res.status(200).json(result);

  } catch (error) {
    console.error('AI Controller Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process your question. Please try again.',
      fallback: true
    });
  }
};

// Get field introduction (no AI call needed)
const getIntro = (req, res) => {
  const { field } = req.params;

  if (!validFields.includes(field)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid service field'
    });
  }

  const intro = getFieldIntro(field);
  
  res.status(200).json({
    success: true,
    intro: intro,
    field: field
  });
};

// Get available fields
const getFields = (req, res) => {
  res.status(200).json({
    success: true,
    fields: validFields,
    descriptions: {
      'websites-and-apps': 'Web Development & Mobile Apps',
      'ai-solutions': 'AI Solutions & Integration',
      'cloud-infrastructure': 'Cloud Infrastructure & DevOps',
      'digital-marketing': 'Digital Marketing & SEO',
      'general': 'General Information & Support'
    }
  });
};

module.exports = {
  askAI,
  getIntro,
  getFields
};