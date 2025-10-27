import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Button, Typography, Space, Input } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../hooks/redux";
import {
  updateSection,
  deleteSection,
  addGroup,
  type Section,
  type Group,
} from "../store/slices/formBuilderSlice";
import GroupComponent from "./Group";
import { generateId } from "../utils/helpers";

const { Title, Text } = Typography;

interface SectionProps {
  section: Section;
}

const SectionComponent: React.FC<SectionProps> = ({ section }) => {
  const dispatch = useAppDispatch();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleTitleChange = (title: string) => {
    dispatch(
      updateSection({
        sectionId: section.id,
        section: { ...section, title },
      })
    );
  };

  const handleDescriptionChange = (description: string) => {
    dispatch(
      updateSection({
        sectionId: section.id,
        section: { ...section, description },
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteSection(section.id));
  };

  const handleAddGroup = () => {
    const newGroup: Group = {
      id: generateId(),
      title: "New Group",
      description: "",
      fields: [],
    };
    dispatch(
      addGroup({
        sectionId: section.id,
        group: newGroup,
      })
    );
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card
        className="section-card"
        title={
          <div className="section-header">
            <Input
              value={section.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Section title"
              style={{
                border: "none",
                padding: 0,
                fontSize: "16px",
                fontWeight: "bold",
              }}
            />
            <Space>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={handleAddGroup}
                size="small"
              >
                Add Group
              </Button>
              <Button
                type="text"
                danger
                icon={<DeleteOutlined />}
                onClick={handleDelete}
                size="small"
              />
            </Space>
          </div>
        }
        extra={
          <Text type="secondary">
            {section.groups.length} group
            {section.groups.length !== 1 ? "s" : ""}
          </Text>
        }
      >
        <div className="section-content">
          <Input
            value={section.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Section description (optional)"
            style={{ marginBottom: 16 }}
          />

          {section.groups.length === 0 ? (
            <div className="empty-groups">
              <Text type="secondary">No groups in this section</Text>
              <br />
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleAddGroup}
                style={{ marginTop: 8 }}
              >
                Add Group
              </Button>
            </div>
          ) : (
            <div className="section-groups">
              {section.groups.map((group) => (
                <GroupComponent
                  key={group.id}
                  group={group}
                  sectionId={section.id}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default SectionComponent;
