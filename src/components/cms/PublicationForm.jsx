import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function PublicationForm({ initialData, onSuccess, onCancel }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    authors: '',
    year: new Date().getFullYear(),
    venue: '',
    category: 'Journal Publications', // Default
    abstract: '',
    link: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Title *</Label>
        <Input 
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select 
            value={formData.category} 
            onValueChange={(value) => setFormData({...formData, category: value})}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Journal Publications">Journal Publications</SelectItem>
              <SelectItem value="Working Papers">Working Papers</SelectItem>
              <SelectItem value="Conference Proceedings">Conference Proceedings</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Year</Label>
          <Input 
            type="number"
            value={formData.year}
            onChange={e => setFormData({...formData, year: parseInt(e.target.value)})}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Venue / Publisher</Label>
        <Input 
          value={formData.venue}
          onChange={e => setFormData({...formData, venue: e.target.value})}
          placeholder="e.g. Management Science, arXiv"
        />
      </div>

      <div className="space-y-2">
        <Label>Authors</Label>
        <Input 
          value={formData.authors}
          onChange={e => setFormData({...formData, authors: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label>Abstract</Label>
        <Textarea 
          value={formData.abstract}
          onChange={e => setFormData({...formData, abstract: e.target.value})}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Link (PDF or URL)</Label>
        <Input 
          value={formData.link}
          onChange={e => setFormData({...formData, link: e.target.value})}
          placeholder="https://..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save Publication</Button>
      </div>
    </form>
  );
}