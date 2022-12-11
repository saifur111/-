import { ReactComponent as DateIcon } from "assets/icon/date-icon.svg";
import { ReactComponent as DeleteIcon } from "assets/icon/delete-icon.svg";
import { ReactComponent as DescriptionIcon } from "assets/icon/description-icon.svg";
import { ReactComponent as StatusIcon } from "assets/icon/status-icon.svg";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const ModalNewTask = ({
  show,
  handleClose,
  activeTask,
  isEditTask,
  handleDeleteTask,
}) => {
  const [dataTask, setDataTask] = useState({
    id: uuidv4(),
    title: "",
    status: "খালি",
    dateCreated: moment().format("MMMM Do YYYY, h:mm:ss A"),
    deadline: "",
    description: "",
  });

  const inputRef = useRef(null);

  /**
   * Handle auto focus input task name
   */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  /**
   * Handle set state when edit
   */
  useEffect(() => {
    if (isEditTask) {
      setDataTask(activeTask);
    }
  }, [isEditTask, activeTask]);

  return (
    <Modal
      show={show}
      onHide={() => handleClose(dataTask)}
      className="modal-new-task"
      centered
    >
      <Modal.Body>
        <div className="modal-new-task-inner">
          <div className="task-name">
            <input
              ref={inputRef}
              type="text"
              className="task-name-input"
              placeholder="টাস্কের নাম"
              value={dataTask.title}
              onChange={(e) =>
                setDataTask({ ...dataTask, title: e.target.value })
              }
              maxLength={50}
            />
            <span className="task-name-length">{dataTask.title.length}/50</span>
          </div>
          <div className="form-wrapper">
            <div className="form-group">
              <label htmlFor="date-created">
                <DateIcon /> তৈরীর তারিখ 
              </label>
              <div className="form-control disable">{dataTask.dateCreated}</div>
            </div>
            <div className="form-group">
              <label htmlFor="deadline">
                <DateIcon /> শেষ তারিখ
              </label>
              <div className="form-control deadline">
                <input
                  type="text"
                  value={
                    dataTask.deadline.length > 0
                      ? moment(dataTask.deadline).format("MMMM Do YYYY")
                      : ""
                  }
                  placeholder="খালি"
                  readOnly
                />
                <input
                  name="deadline"
                  type="date"
                  onChange={(e) =>
                    setDataTask({ ...dataTask, deadline: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="status">
                <StatusIcon /> টাস্ক স্ট্যাটাস
              </label>
              <div className="form-control status">
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <span className={dataTask.status}>
                      {dataTask.status === "todo" ? "To do" : dataTask.status}{" "}
                      {dataTask.status === "done" && "🙌"}
                    </span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <p>একটি বিকল্প নির্বাচন করুন বা একটি তৈরি করুন</p>
                    <Dropdown.Item
                      onClick={() =>
                        setDataTask({ ...dataTask, status: "todo" })
                      }
                    >
                      <span>এটা করব</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setDataTask({ ...dataTask, status: "doing" })
                      }
                    >
                      <span>করতেছি</span>
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        setDataTask({ ...dataTask, status: "done" })
                      }
                    >
                      <span>করা শেষ 🙌</span>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">
                <DescriptionIcon /> বর্ণনা
              </label>
              <div className="form-control description">
                <textarea
                  name="description"
                  type="text"
                  placeholder="খালি"
                  maxLength={255}
                  onChange={(e) =>
                    setDataTask({ ...dataTask, description: e.target.value })
                  }
                  value={dataTask.description}
                />
                <span>{dataTask.description.length}/255</span>
              </div>
            </div>
          </div>
          {isEditTask && (
            <Button
              className="btn-delete-task"
              onClick={() => handleDeleteTask(dataTask)}
            >
              <DeleteIcon />
            </Button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalNewTask;
