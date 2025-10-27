import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";
import { Card, Button, Typography, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addSection, type Section } from "../store/slices/formBuilderSlice";
import SectionComponent from "./Section";
import { generateId } from "../utils/helpers";

const { Title, Text } = Typography;

const FormBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentForm } = useAppSelector((state) => state.formBuilder.present);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Handle section reordering
    if (active.id !== over.id) {
      // This would be implemented with a reorder action
      console.log("Reorder sections:", active.id, over.id);
    }
  };

  const handleAddSection = () => {
    const newSection: Section = {
      id: generateId(),
      title: "New Section",
      description: "",
      groups: [],
    };
    dispatch(addSection(newSection));
  };

  return (
    <div className="form-builder">
      <Card>
        <div className="form-builder-header">
          <div>
            <Title level={3}>{currentForm.title}</Title>
            {currentForm.description && (
              <Text type="secondary">{currentForm.description}</Text>
            )}
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddSection}
          >
            Add Section
          </Button>
        </div>

        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <div className="form-sections">
            {currentForm.form_structure.length === 0 ? (
              <Empty
                description="No sections yet"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              >
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddSection}
                >
                  Add Your First Section
                </Button>
              </Empty>
            ) : (
              <SortableContext
                items={currentForm.form_structure.map((section) => section.id)}
                strategy={verticalListSortingStrategy}
              >
                {currentForm.form_structure.map((section) => (
                  <SectionComponent key={section.id} section={section} />
                ))}
              </SortableContext>
            )}
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="drag-overlay">
                <Text>Dragging...</Text>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Card>
    </div>
  );
};

export default FormBuilder;
