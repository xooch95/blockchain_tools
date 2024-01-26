import React, { useState } from 'react';
import { Button, Form, InputNumber, Select, Descriptions } from "antd";
import './index.scss'

const handleChange = () => {

}

const levels = [
    45.00, 46.50, 48.00, 49.50, 51.00, 52.50, 54.00, 55.50, 57.00, 58.50,
    60.00, 61.50, 63.00, 64.50, 66.00, 67.50, 69.00, 70.50, 72.00, 73.50,
    75.50, 76.50, 78.00, 79.50, 81.00, 82.50, 84.00, 85.50, 87.00, 88.50,
    90.00, 91.50, 93.00, 94.00, 95.00, 96.00, 97.00, 98.00, 99.00, 100.00]
const factoryLevel = []

const generateFactoryLevel = () => {
    levels.forEach((v, i) => {
        factoryLevel.push({ value: v, label: `Level ${i + 1}转换率(${v}%)` })
    })
}
generateFactoryLevel();
console.log(factoryLevel)

interface FormInter {
    level: number,
    hourProduct: number,
    tgaPrice: number,
    cost: number,
}


export default () => {
    const [details, setDetails] = useState([])
    const [cycle, setCycle] = useState(0)
    const [isCalc, setCalc] = useState(false)

    // const [dailyProduct, setDailyProduct] = useSta
    const onFinish = (val: FormInter) => {
        const dailyProduct = val.hourProduct * 24;
        // 工厂转换率 * 日产量 * TGA价格
        const dailyEarn = val.level / 100 * dailyProduct * val.tgaPrice;
        const cycle = (val.cost / dailyEarn).toFixed(1);
        setCycle(cycle)
        setCalc(true)
        setDetails([
            {
                label: '回本周期/天',
                children: cycle
            },
            {
                label: '日产量/天',
                children: `${dailyProduct}`,
            },
            {
                label: '日收入/U',
                children: `${dailyEarn}U`
            }
        ])
    }

    const onFinishFailed = () => {

    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            <div className='calc-title'>TgPet回本周期计算器</div>
            <br/>
            <Form
                name='baisc'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ level: 100, hourProduct: 11.54, tgaPrice: 0.005, cost: 100 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="工厂等级"
                    name="level"
                    rules={[
                        {
                            required: true,
                            message: '请选择工厂等级',
                        },
                    ]}
                >
                    <Select
                        style={{}}
                        onChange={handleChange}
                        options={factoryLevel}
                    />
                </Form.Item>
                <Form.Item
                    label="产量/小时(h)"
                    name="hourProduct"
                    rules={[
                        {
                            required: true,
                            message: '请输入每小时的产量',
                        },
                    ]}
                >
                    <InputNumber
                        prefix=""
                        style={{ width: '100%' }} min={11.54} step={0.01}></InputNumber>

                </Form.Item>
                <Form.Item
                    label="当前$TGA价格"
                    name="tgaPrice"
                    rules={[
                        {
                            required: true,
                            message: '请输入当前$TGA价格',
                        },
                    ]}
                >
                    <InputNumber
                        prefix="$"
                        style={{ width: '100%' }} min={0} step={0.0001}></InputNumber>
                </Form.Item>

                <Form.Item
                    label="成本USDT"
                    name="cost"
                    rules={[
                        {
                            required: true,
                            message: '请输入成本',
                        },
                    ]}
                >
                    <InputNumber
                        prefix="$"
                        style={{ width: '100%' }} min={1} ></InputNumber>
                </Form.Item>

                <Form.Item
                    className='submit-btn'
                >
                    <Button style={{ width: '100%', height: '38px' }} type="primary"
                        htmlType="submit" >开始计算</Button>
                </Form.Item>
            </Form>

            <div>
                {
                    isCalc ?
                        <div style={{ color: 'red', fontWeight: 600, fontSize: '40px' }}>您的回本周期是：<span>{cycle}</span></div>
                        : ''
                }
                <Descriptions title="计算结果详情" column={1} bordered items={details} />
                <br />
                <p style={{ color: 'red' }}>我使用的计算公式如下：</p>
                <div style={{ color: 'gray' }}>计算公式：每日收入 = 工厂转换率 / 100 * 每小时产量 * 24 * 当前$TGA价格</div>
            </div>
        </div>
    );
}