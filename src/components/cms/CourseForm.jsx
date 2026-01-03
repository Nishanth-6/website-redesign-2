import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CourseForm({ course, onSave, onCancel }) {
  const [formData, setFormData] = useState(course || {
    code: '',
    name: '',
    institution: '',
    level: 'undergraduate',
    semesters: '',
    description: '',
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
          {course ? 'Edit Course' : 'New Course'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Course Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Analytics for Optimization"
                className="border-gray-300 dark:border-gray-600"
              />
            </div>

            <div className="space-y-2">
              <Label>Course Code</Label>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="e.g., IDS 435"
                className="border-gray-300 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Institution *</Label>
            <Input
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              required
              placeholder="e.g., University of Illinois at Chicago"
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Level</Label>
            <Select
              value={formData.level}
              onValueChange={(value) => setFormData({ ...formData, level: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="undergraduate">Undergraduate</SelectItem>
                <SelectItem value="masters">Masters</SelectItem>
                <SelectItem value="mba">MBA</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Semesters Taught</Label>
            <Input
              value={formData.semesters}
              onChange={(e) => setFormData({ ...formData, semesters: e.target.value })}
              placeholder="e.g., Spring 2022/23, Fall 2024"
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="border-gray-300 dark:border-gray-600"
            />
          </div>

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
              Save Course
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}