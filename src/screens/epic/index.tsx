import { Row, ScreenContainer } from "../../components/lib";
import React, { useState } from "react";
import { useProjectInUrl } from "../kanban/util";
import { useDocumentTitle } from "../../utils";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { useEpicSearchParams, useEpicsQueryKey } from "./util";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useTasks } from "../../utils/task";
import { Link } from "react-router-dom";
import { Epic } from "../../types/epic";
import { CreateEpic } from "./create-epic";
import styled from "@emotion/styled";

export const EpicScreen = () => {
  useDocumentTitle("任务组列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ processorId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组: ${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button type="primary" onClick={() => setEpicCreateOpen(true)}>
          创建任务组
        </Button>
      </Row>
      <ListContainer>
        <List
          dataSource={epics}
          itemLayout={"vertical"}
          renderItem={(epic) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Row between={true}>
                    <span>{epic.name}</span>
                    <Button
                      type={"link"}
                      onClick={() => confirmDeleteEpic(epic)}
                    >
                      删除
                    </Button>
                  </Row>
                }
                description={
                  <div>
                    <div>
                      开始时间: {dayjs(epic.start).format("YYYY-MM-DD")}
                    </div>
                    <div>结束时间: {dayjs(epic.end).format("YYYY-MM-DD")}</div>
                  </div>
                }
              />
              <div>
                {tasks
                  ?.filter((task) => task.epicId === epic.id)
                  .map((task) => (
                    <Link
                      key={task.id}
                      to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    >
                      {task.name}
                    </Link>
                  ))}
              </div>
            </List.Item>
          )}
        />
      </ListContainer>
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
};

const ListContainer = styled.div`
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0.5rem;
    border-radius: 1rem;
    background-color: rgba(0, 0, 0, 0.1);
  }
  /*定义滚动条轨道
       内阴影+圆角*/
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    border-radius: 1rem;
    background-color: #f5f5f5;
  }
  /*定义滑块
       内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
