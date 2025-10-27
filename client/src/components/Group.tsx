import { Card, Button, Typography, Space, Input, Select } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../hooks/redux";
import {
  updateGroup,
  deleteGroup,
  addField,
  type Group,
  type Field,
} from "../store/slices/formBuilderSlice";
import FieldComponent from "./Field";
import { generateId } from "../utils/helpers";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface GroupProps {
  group: Group;
  sectionId: string;
}

const GroupComponent: React.FC<GroupProps> = ({ group, sectionId }) => {
  const dispatch = useAppDispatch();

  const handleTitleChange = (title: string) => {
    dispatch(
      updateGroup({
        sectionId,
        groupId: group.id,
        group: { ...group, title },
      })
    );
  };

  const handleDescriptionChange = (description: string) => {
    dispatch(
      updateGroup({
        sectionId,
        groupId: group.id,
        group: { ...group, description },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteGroup({
        sectionId,
        groupId: group.id,
      })
    );
  };

  const handleAddField = (type: Field["type"]) => {
    const newField: Field = {
      id: generateId(),
      type,
      label: `New ${type} field`,
      placeholder: `Enter ${type}`,
      required: false,
    };
    dispatch(
      addField({
        sectionId,
        groupId: group.id,
        field: newField,
      })
    );
  };

  const fieldTypes: { value: Field["type"]; label: string }[] = [
    { value: "text", label: "Text Input" },
    { value: "email", label: "Email" },
    { value: "number", label: "Number" },
    { value: "textarea", label: "Textarea" },
    { value: "select", label: "Select" },
    { value: "radio", label: "Radio" },
    { value: "checkbox", label: "Checkbox" },
  ];

  return (
    <Card
      className="group-card"
      size="small"
      title={
        <div className="group-header">
          <Input
            value={group.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Group title"
            style={{
              border: "none",
              padding: 0,
              fontSize: "14px",
              fontWeight: "bold",
            }}
          />
          <Space>
            <Select
              placeholder="Add field"
              style={{ width: 120 }}
              size="small"
              onSelect={handleAddField}
            >
              {fieldTypes.map((type) => (
                <Select.Option key={type.value} value={type.value}>
                  {type.label}
                </Select.Option>
              ))}
            </Select>
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
          {group.fields.length} field{group.fields.length !== 1 ? "s" : ""}
        </Text>
      }
    >
      <div className="group-content">
        <TextArea
          value={group.description}
          onChange={(e) => handleDescriptionChange(e.target.value)}
          placeholder="Group description (optional)"
          rows={2}
          style={{ marginBottom: 16 }}
        />

        {group.fields.length === 0 ? (
          <div className="empty-fields">
            <Text type="secondary">No fields in this group</Text>
            <br />
            <Select
              placeholder="Add field"
              style={{ width: 150, marginTop: 8 }}
              onSelect={handleAddField}
            >
              {fieldTypes.map((type) => (
                <Select.Option key={type.value} value={type.value}>
                  {type.label}
                </Select.Option>
              ))}
            </Select>
          </div>
        ) : (
          <div className="group-fields">
            {group.fields.map((field) => (
              <FieldComponent
                key={field.id}
                field={field}
                sectionId={sectionId}
                groupId={group.id}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default GroupComponent;
