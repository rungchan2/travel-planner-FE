import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { useState } from "react";

interface EditTripFormProps {
  trip: {
    id: string;
    userId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  };
  onSave: (updatedTrip: {
    id: string;
    userId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => void;
  onCancel: () => void;
}

export function EditTripForm({ trip, onSave, onCancel }: EditTripFormProps) {
  const [name, setName] = useState(trip.name);
  const [description, setDescription] = useState(trip.description);
  const [startDate, setStartDate] = useState(trip.startDate);
  const [endDate, setEndDate] = useState(trip.endDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...trip, name, description, startDate, endDate });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">여행 제목</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">상세 설명</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="startDate">시작 날짜</Label>
        <Input
          id="startDate"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="endDate">종료 날짜</Label>
        <Input
          id="endDate"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit">저장</Button>
      </div>
    </form>
  );
}
