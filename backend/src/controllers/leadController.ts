import { Response } from 'express'
import Lead from '../models/Lead'
import { AuthRequest } from '../middleware/auth'

export const getLeads = async (req: AuthRequest, res: Response) => {
  try {
    const { status, source, search, sort, page = 1, limit = 10 } = req.query

    const query: Record<string, unknown> = {}

    if (status) query.status = status
    if (source) query.source = source
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    }

    const sortOrder = sort === 'oldest' ? 1 : -1
    const skip = (Number(page) - 1) * Number(limit)

    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdAt: sortOrder }).skip(skip).limit(Number(limit)),
      Lead.countDocuments(query)
    ])

    res.json({
      leads,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const createLead = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, status, source } = req.body
    if (!name || !email || !source) return res.status(400).json({ message: 'All fields are required' })

    const lead = await Lead.create({ name, email, status, source, createdBy: req.user?.id })
    res.status(201).json(lead)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateLead = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json(lead)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteLead = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Admin only' })
    const lead = await Lead.findByIdAndDelete(req.params.id)
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json({ message: 'Lead deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const getLead = async (req: AuthRequest, res: Response) => {
  try {
    const lead = await Lead.findById(req.params.id)
    if (!lead) return res.status(404).json({ message: 'Lead not found' })
    res.json(lead)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}