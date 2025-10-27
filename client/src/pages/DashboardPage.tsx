import { useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Layout,
  Card,
  Button,
  Typography,
  List,
  Avatar,
  Space,
  message,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchForms, deleteForm } from "../store/slices/formBuilderSlice";
import { logout as authLogout } from "../store/slices/authSlice";

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { savedForms, isLoading } = useAppSelector(
    (state) => state.formBuilder.present
  );

  useEffect(() => {
    dispatch(fetchForms());
  }, [dispatch]);

  const handleCreateForm = () => {
    navigate("/builder");
  };

  const handleEditForm = (formId: number) => {
    navigate(`/builder/${formId}`);
  };

  const handleDeleteForm = async (formId: number) => {
    const result = await dispatch(deleteForm(formId));
    if (deleteForm.fulfilled.match(result)) {
      message.success("Form deleted successfully");
    } else {
      message.error("Failed to delete form");
    }
  };

  const handleLogout = async () => {
    await dispatch(authLogout());
    navigate("/login");
  };

  return (
    <Layout className="dashboard-layout">
      <Header className="dashboard-header">
        <div className="header-content">
          <Title level={3} style={{ color: "white", margin: 0 }}>
            Form Builder
          </Title>
          <Space>
            <Text style={{ color: "white" }}>Welcome, {user?.name}</Text>
            <Button type="primary" ghost onClick={handleLogout}>
              Logout
            </Button>
          </Space>
        </div>
      </Header>

      <Content className="dashboard-content">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div>
              <Title level={2}>My Forms</Title>
              <Text type="secondary">Create and manage your dynamic forms</Text>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              onClick={handleCreateForm}
            >
              Create New Form
            </Button>
          </div>

          {savedForms.length === 0 ? (
            <Card className="empty-state">
              <div className="empty-content">
                <Title level={3}>No forms yet</Title>
                <Text type="secondary">
                  Get started by creating your first dynamic form
                </Text>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  size="large"
                  onClick={handleCreateForm}
                  style={{ marginTop: 16 }}
                >
                  Create Your First Form
                </Button>
              </div>
            </Card>
          ) : (
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
              dataSource={savedForms}
              loading={isLoading}
              renderItem={(form) => (
                <List.Item>
                  <Card
                    hoverable
                    actions={[
                      <Button
                        key="edit"
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEditForm(form.id!)}
                      >
                        Edit
                      </Button>,
                      <Popconfirm
                        key="delete"
                        title="Delete form"
                        description="Are you sure you want to delete this form?"
                        onConfirm={() => handleDeleteForm(form.id!)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="text" danger icon={<DeleteOutlined />}>
                          Delete
                        </Button>
                      </Popconfirm>,
                    ]}
                  >
                    <Card.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={form.title}
                      description={
                        <div>
                          <Text type="secondary" ellipsis>
                            {form.description || "No description"}
                          </Text>
                          <br />
                          <Text type="secondary" style={{ fontSize: "12px" }}>
                            {form.updated_at
                              ? new Date(form.updated_at).toLocaleDateString()
                              : "Just created"}
                          </Text>
                        </div>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default DashboardPage;
