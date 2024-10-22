import React, { Suspense, useEffect, useState } from "react";
import { Card, Nav, Tab } from "react-bootstrap";

// Lazily import the settings components
const CustomerSettings1 = React.lazy(() => import("./settings/CustomerSet"));
const DeviceSettings1 = React.lazy(() => import("./settings/DeviceSet"));
const UserSettings1 = React.lazy(() => import("./settings/UserSet"));

const Admin = () => {
  const [activeTab, setActiveTab] = useState("CustomerSettings");

  const handleTabChange = (key: any) => {
    setActiveTab(key);
  };

  return (
    <>
      <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
        <Card>
          <Nav variant="pills" justify className="">
            <Nav.Item>
              <Nav.Link eventKey="CustomerSettings">
                <span className="d-none d-md-block" style={{ cursor: "pointer" }}>
                  Customer Settings
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="DeviceSettings">
                <span className="d-none d-md-block" style={{ cursor: "pointer" }}>
                  Device Settings
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="UserSettings">
                <span className="d-none d-md-block" style={{ cursor: "pointer" }}>
                  User Settings
                </span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card>
        <Tab.Content>
          {activeTab === "CustomerSettings" && (
            <Tab.Pane eventKey="CustomerSettings" id="CustomerSettings">
              <Suspense fallback={<div>Loading...</div>}>
                <CustomerSettings1 />
              </Suspense>
            </Tab.Pane>
          )}
          {activeTab === "DeviceSettings" && (
            <Tab.Pane eventKey="DeviceSettings" id="DeviceSettings">
              <Suspense fallback={<div>Loading...</div>}>
                <DeviceSettings1 />
              </Suspense>
            </Tab.Pane>
          )}
          {activeTab === "UserSettings" && (
            <Tab.Pane eventKey="UserSettings" id="UserSettings">
              <Suspense fallback={<div>Loading...</div>}>
                <UserSettings1 />
              </Suspense>
            </Tab.Pane>
          )}
        </Tab.Content>
      </Tab.Container>
    </>
  );
};

export default Admin;