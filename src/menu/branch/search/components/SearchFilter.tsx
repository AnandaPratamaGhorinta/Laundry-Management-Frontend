import { Collapse, Form, Input, Button } from "antd";
import { useCallback, useState } from "react";
import { mockFetchBranches } from "../mockData";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const { Panel } = Collapse;

interface SearchFilterProps {
  setData: React.Dispatch<
    React.SetStateAction<
      {
        code: string;
        name: string;
        isActive: boolean;
      }[]
    >
  >;
}

export default function SearchFilter({ setData }: SearchFilterProps) {
  const [form] = Form.useForm();
  const [filterCode, setFilterCode] = useState("");
  const [filterName, setFilterName] = useState("");

  const onSearch = useCallback(async () => {
    const result: any = await mockFetchBranches(filterCode, filterName);
    setData(result);
  }, [filterCode, filterName, setData]);

  const onClean = () => {
    form.resetFields();
    setFilterName("");
    setFilterCode("");
  };

  return (
    <Collapse defaultActiveKey={"1"}>
      <Panel header="Filter" key="1">
        <Form
          form={form}
          layout="horizontal"
          labelAlign="left"
          style={{ maxWidth: 600 }}
          {...formItemLayout}
        >
          <Form.Item label="Name" name="name">
            <Input
              placeholder="Enter name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Code" name="code">
            <Input
              placeholder="Enter code"
              value={filterCode}
              onChange={(e) => setFilterCode(e.target.value)}
            />
          </Form.Item>
          <div style={{ marginLeft: 150 }}>
            <Form.Item>
              <Button type="primary" onClick={onSearch}>
                Search
              </Button>
              <Button style={{ marginLeft: "10px" }} onClick={onClean}>
                Clear
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Panel>
    </Collapse>
  );
}
