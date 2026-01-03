import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function StudentForm({ student, onSave, onCancel }) {
  const [formData, setFormData] = useState(student || {
    name: '',
    degree: 'phd',
    status: 'current',
    institution: '',
    program: '',
    background: '',
    research_interests: '',
    thesis_title: '',
    graduation_year: '',
    first_position: '',
    current_position: '',
    website_url: '',
    co_supervisors: '',
    start_year: '',
    order: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-xl font-light">
          {student ? 'Edit Student' : 'New Student'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Degree *</Label>
              <Select
                value={formData.degree}
                onValueChange={(value) => setFormData({ ...formData, degree: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phd">PhD</SelectItem>
                  <SelectItem value="masters">Masters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current</SelectItem>
                  <SelectItem value="former">Former</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{formData.status === 'current' ? 'Start Year' : 'Graduation Year'}</Label>
              <Input
                value={formData.status === 'current' ? formData.start_year : formData.graduation_year}
                onChange={(e) => setFormData({
                  ...formData,
                  [formData.status === 'current' ? 'start_year' : 'graduation_year']: e.target.value
                })}
                placeholder="e.g., 2023, Fall 2023"
                className="border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Institution</Label>
              <Input
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="e.g., University of Illinois at Chicago"
                className="border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <Label>Program/Department</Label>
              <Input
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                placeholder="e.g., Information and Decision Sciences"
                className="border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Background</Label>
            <Textarea
              value={formData.background}
              onChange={(e) => setFormData({ ...formData, background: e.target.value })}
              rows={2}
              placeholder="e.g., BSc in Mathematics, University of XYZ"
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Research Interests</Label>
            <Textarea
              value={formData.research_interests}
              onChange={(e) => setFormData({ ...formData, research_interests: e.target.value })}
              rows={2}
              placeholder="e.g., Reinforcement learning, Energy systems"
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Thesis Title</Label>
            <Textarea
              value={formData.thesis_title}
              onChange={(e) => setFormData({ ...formData, thesis_title: e.target.value })}
              rows={2}
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Co-supervisors</Label>
            <Input
              value={formData.co_supervisors}
              onChange={(e) => setFormData({ ...formData, co_supervisors: e.target.value })}
              placeholder="e.g., Prof. John Smith"
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Website URL</Label>
            <Input
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://"
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          {formData.status === 'former' && (
            <>
              <div className="space-y-2">
                <Label>First Position</Label>
                <Input
                  value={formData.first_position}
                  onChange={(e) => setFormData({ ...formData, first_position: e.target.value })}
                  placeholder="e.g., Post-doctoral fellow, MIT"
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <Label>Current Position</Label>
                <Input
                  value={formData.current_position}
                  onChange={(e) => setFormData({ ...formData, current_position: e.target.value })}
                  placeholder="e.g., Assistant Professor, Harvard University"
                  className="border-gray-300 dark:border-gray-600"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Display Order</Label>
            <Input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Student
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}