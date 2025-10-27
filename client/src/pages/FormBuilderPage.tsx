import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Layout, Button, Typography, message, Space } from "antd";
import {
  SaveOutlined,
  ArrowLeftOutlined,
  UndoOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  saveForm,
  newForm,
  updateFormTitle,
  updateFormDescription,
} from "../store/slices/formBuilderSlice";
import FormBuilder from "../components/FormBuilder";
import FormSettings from "../components/FormSettings";
import { ActionCreators } from "redux-undo";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const FormBuilderPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentForm, isDirty, isLoading } = useAppSelector(
    (state) => state.formBuilder.present
  );
  const { past, future } = useAppSelector((state) => state.formBuilder);

  // const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (id) {
      // Load existing form
      // This would typically fetch from the API
      // For now, we'll handle this in the component
    } else {
      dispatch(newForm());
    }
  }, [id, dispatch]);

  const handleSave = async () => {
    const result = await dispatch(saveForm(currentForm));
    if (saveForm.fulfilled.match(result)) {
      message.success("Form saved successfully!");
      if (!id) {
        navigate(`/builder/${result.payload.id}`);
      }
    } else {
      message.error("Failed to save form");
    }
  };

  const handleUndo = () => {
    dispatch(ActionCreators.undo());
  };

  const handleRedo = () => {
    dispatch(ActionCreators.redo());
  };

  const handleBack = () => {
    if (isDirty) {
      // Show confirmation dialog
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        )
      ) {
        navigate("/dashboard");
      }
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <Layout className="form-builder-layout">
      <Header className="form-builder-header">
        <div className="header-content">
          <Space>
            <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>
              Back
            </Button>
            <Title level={4} style={{ color: "white", margin: 0 }}>
              {currentForm.title || "Untitled Form"}
            </Title>
          </Space>

          <Space>
            <Button
              icon={<UndoOutlined />}
              disabled={past.length === 0}
              onClick={handleUndo}
            >
              Undo
            </Button>
            <Button
              icon={<RedoOutlined />}
              disabled={future.length === 0}
              onClick={handleRedo}
            >
              Redo
            </Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              loading={isLoading}
              onClick={handleSave}
            >
              Save Form
            </Button>
          </Space>
        </div>
      </Header>

      <Layout>
        <Sider width={300} className="form-builder-sidebar">
          <FormSettings
            form={currentForm}
            onTitleChange={(title) => dispatch(updateFormTitle(title))}
            onDescriptionChange={(description) =>
              dispatch(updateFormDescription(description))
            }
          />
        </Sider>

        <Content className="form-builder-content">
          <FormBuilder />
        </Content>
      </Layout>
    </Layout>
  );
};

export default FormBuilderPage;
