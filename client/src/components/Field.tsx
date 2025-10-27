import {
  Card,
  Input,
  Typography,
  Space,
  Button,
  Switch,
  Select,
  InputNumber,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../hooks/redux";
import {
  updateField,
  deleteField,
  type Field,
} from "../store/slices/formBuilderSlice";

const { Text } = Typography;
const { TextArea } = Input;

interface FieldProps {
  field: Field;
  sectionId: string;
  groupId: string;
}

const FieldComponent: React.FC<FieldProps> = ({
  field,
  sectionId,
  groupId,
}) => {
  const dispatch = useAppDispatch();

  const handleLabelChange = (label: string) => {
    dispatch(
      updateField({
        sectionId,
        groupId,
        fieldId: field.id,
        field: { ...field, label },
      })
    );
  };

  const handlePlaceholderChange = (placeholder: string) => {
    dispatch(
      updateField({
        sectionId,
        groupId,
        fieldId: field.id,
        field: { ...field, placeholder },
      })
    );
  };

  const handleRequiredChange = (required: boolean) => {
    dispatch(
      updateField({
        sectionId,
        groupId,
        fieldId: field.id,
        field: { ...field, required },
      })
    );
  };

  const handleOptionsChange = (options: string[]) => {
    dispatch(
      updateField({
        sectionId,
        groupId,
        fieldId: field.id,
        field: { ...field, options },
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteField({
        sectionId,
        groupId,
        fieldId: field.id,
      })
    );
  };

  const renderFieldPreview = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <Input
            placeholder={field.placeholder}
            type={field.type}
            disabled
            style={{ marginTop: 8 }}
          />
        );
      case "textarea":
        return (
          <TextArea
            placeholder={field.placeholder}
            rows={3}
            disabled
            style={{ marginTop: 8 }}
          />
        );
      case "select":
        return (
          <Select
            placeholder={field.placeholder}
            disabled
            style={{ width: "100%", marginTop: 8 }}
          >
            {field.options?.map((option, index) => (
              <Select.Option key={index} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        );
      case "radio":
        return (
          <div style={{ marginTop: 8 }}>
            {field.options?.map((option, index) => (
              <div key={index}>
                <input type="radio" disabled style={{ marginRight: 8 }} />
                <Text>{option}</Text>
              </div>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div style={{ marginTop: 8 }}>
            {field.options?.map((option, index) => (
              <div key={index}>
                <input type="checkbox" disabled style={{ marginRight: 8 }} />
                <Text>{option}</Text>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      className="field-card"
      size="small"
      title={
        <div className="field-header">
          <Input
            value={field.label}
            onChange={(e) => handleLabelChange(e.target.value)}
            placeholder="Field label"
            style={{
              border: "none",
              padding: 0,
              fontSize: "12px",
              fontWeight: "bold",
            }}
          />
          <Space>
            <Text type="secondary" style={{ fontSize: "10px" }}>
              {field.type}
            </Text>
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
    >
      <div className="field-content">
        <Space direction="vertical" style={{ width: "100%" }} size="small">
          <div>
            <Text strong style={{ fontSize: "12px" }}>
              Placeholder:
            </Text>
            <Input
              value={field.placeholder}
              onChange={(e) => handlePlaceholderChange(e.target.value)}
              placeholder="Field placeholder"
              size="small"
              style={{ marginTop: 4 }}
            />
          </div>

          <div>
            <Space>
              <Text strong style={{ fontSize: "12px" }}>
                Required:
              </Text>
              <Switch
                checked={field.required}
                onChange={handleRequiredChange}
                size="small"
              />
            </Space>
          </div>

          {(field.type === "select" ||
            field.type === "radio" ||
            field.type === "checkbox") && (
            <div>
              <Text strong style={{ fontSize: "12px" }}>
                Options:
              </Text>
              <div style={{ marginTop: 4 }}>
                {field.options?.map((option, index) => (
                  <div key={index} style={{ marginBottom: 4 }}>
                    <Input
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(field.options || [])];
                        newOptions[index] = e.target.value;
                        handleOptionsChange(newOptions);
                      }}
                      placeholder={`Option ${index + 1}`}
                      size="small"
                      style={{ width: "calc(100% - 30px)" }}
                    />
                    <Button
                      type="text"
                      danger
                      size="small"
                      onClick={() => {
                        const newOptions =
                          field.options?.filter((_, i) => i !== index) || [];
                        handleOptionsChange(newOptions);
                      }}
                      style={{ width: "30px" }}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <Button
                  type="dashed"
                  size="small"
                  onClick={() => {
                    const newOptions = [...(field.options || []), ""];
                    handleOptionsChange(newOptions);
                  }}
                  style={{ width: "100%", marginTop: 4 }}
                >
                  Add Option
                </Button>
              </div>
            </div>
          )}

          <div>
            <Text strong style={{ fontSize: "12px" }}>
              Preview:
            </Text>
            {renderFieldPreview()}
          </div>
        </Space>
      </div>
    </Card>
  );
};

export default FieldComponent;
