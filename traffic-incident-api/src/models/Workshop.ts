// src/models/Workshop.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkshop extends Document {
  name: string;
  address: string;
  phone: string;
  email: string;
  specialties: string[];
  status: 'active' | 'inactive';
  coordinates: {
    lat: number;
    lng: number;
  };
  workingHours: {
    [key: string]: {
      open: string;
      close: string;
    };
  };
  ratings: {
    average: number;
    count: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const workshopSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  specialties: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  workingHours: {
    monday: {
      open: String,
      close: String
    },
    tuesday: {
      open: String,
      close: String
    },
    wednesday: {
      open: String,
      close: String
    },
    thursday: {
      open: String,
      close: String
    },
    friday: {
      open: String,
      close: String
    },
    saturday: {
      open: String,
      close: String
    },
    sunday: {
      open: String,
      close: String
    }
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

export const Workshop = mongoose.model<IWorkshop>('Workshop', workshopSchema);