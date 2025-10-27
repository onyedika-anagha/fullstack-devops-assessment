import { Card, Input, Typography, Divider, Button, Space } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Form } from "../store/slices/formBuilderSlice";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface FormSettingsProps {
  form: Form;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
}

const FormSettings: React.FC<FormSettingsProps> = ({
  form,
  onTitleChange,
  onDescriptionChange,
}) => {
  return (
    <div className="form-settings">
      <Card
        title={
          <>
            <SettingOutlined /> Form Settings
          </>
        }
        size="small"
      >
        <Space direction="vertical" style={{ width: "100%" }} size="middle">
          <div>
            <Text strong>Form Title</Text>
            <Input
              value={form.title}
              onChange={(e) => onTitleChange(e.target.value)}
              placeholder="Enter form title"
              style={{ marginTop: 8 }}
            />
          </div>

          <div>
            <Text strong>Description</Text>
            <TextArea
              value={form.description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Enter form description"
              rows={3}
              style={{ marginTop: 8 }}
            />
          </div>

          <Divider />

          <div>
            <Text strong>Form Structure</Text>
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                Sections: {form.form_structure.length}
              </Text>
              <br />
              <Text type="secondary">
                Total Groups:{" "}
                {form.form_structure.reduce(
                  (acc, section) => acc + section.groups.length,
                  0
                )}
              </Text>
              <br />
              <Text type="secondary">
                Total Fields:{" "}
                {form.form_structure.reduce(
                  (acc, section) =>
                    acc +
                    section.groups.reduce(
                      (groupAcc, group) => groupAcc + group.fields.length,
                      0
                    ),
                  0
                )}
              </Text>
            </div>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default FormSettings;
