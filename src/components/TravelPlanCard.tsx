import { EditTripForm } from "./EditTripForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface TripCardProps {
  plan: TripPlan;
  onDelete: (id: string) => void;
  onEdit: (updatedTrip: {
    id: string;
    userId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => void;
}

interface TripPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  imagePath?: string;
}
const calculateDaysLeft = (startDate: string): number => {
  const today = new Date();
  const start = new Date(startDate);
  const timeDiff = start.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const getDaysLeftText = (daysLeft: number): string => {
  if (daysLeft === 0) return "D-Day";
  if (daysLeft > 0) return `D-${daysLeft}`;
  return `D+${Math.abs(daysLeft)}`;
};

const getDaysLeftColor = (daysLeft: number): string => {
  if (daysLeft === 0) return "bg-green-500 text-white";
  if (daysLeft > 0 && daysLeft <= 7) return "bg-red-500 text-white";
  if (daysLeft > 0) return "bg-blue-500 text-white";
  return "bg-gray-500 text-white";
};

export default function TravelPlanCard({
  plan,
  onEdit,
  onDelete,
}: TripCardProps) {
  const { id, name, description, startDate, endDate } = plan;
  const daysLeft = calculateDaysLeft(startDate);
  const daysLeftText = getDaysLeftText(daysLeft);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dialog = document.getElementById("dialog");
  dialog?.addEventListener("click", (e) => {
    const target = e.target;
    console.log(target);
    const rect = target.getBoundingClientRect();
    if (
      rect.left > e.clientX ||
      rect.right < e.clientX ||
      rect.top > e.clientY ||
      rect.bottom < e.clientY
    ) {
      setIsEditModalOpen(false);
    }
  });
  return (
    <Link
      to={`/travel/${id}`}
      state={{ trip: plan }}
      className="block"
      onClick={(e) => {
        if (isEditModalOpen) e.preventDefault();
      }}
    >
      <Card className="w-full relative hover:shadow-lg transition-shadow">
        <div
          className="absolute top-2 right-2 z-10 no-link"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              setIsEditModalOpen(true);
            }}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit trip</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(id);
            }}
          >
            <X size={16} />
            <span className="sr-only">delete trip</span>
          </Button>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className={getDaysLeftColor(daysLeft)}>
            {daysLeftText}
          </Badge>
        </div>
        <CardHeader className="pt-10">
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {startDate} - {endDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{description}</p>
        </CardContent>
      </Card>
      <div
        id="dialog"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <Dialog
          open={isEditModalOpen}
          onOpenChange={(isOpen) => setIsEditModalOpen(isOpen)}
        >
          <DialogContent onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
              <DialogTitle>여행 수정</DialogTitle>
            </DialogHeader>
            <EditTripForm
              trip={plan}
              onSave={(updatedTrip: TripPlan) => {
                onEdit(updatedTrip);
              }}
              onCancel={() => setIsEditModalOpen(false)} //
            />
          </DialogContent>
        </Dialog>
      </div>
    </Link>
  );
}
