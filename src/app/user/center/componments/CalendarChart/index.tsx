
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import React from "react";
import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getUserSignInRecordUsingGet } from "@/api/userController";
import { message } from "antd";

interface Props {

}

/**
 * 刷题日历图
 * @param props
 * @constructor
 */
const CalendarChart = (props: Props) => {
    const { } = props;
    const [dataList, setDataList] = useState<number[]>([]);

    const year = new Date().getFullYear();

    // 获取真实数据，只调用一次
    useEffect(() => {
        const fetchDataList = async () => {
            try {
                const res = await getUserSignInRecordUsingGet({ year });
                // @ts-ignore
                setDataList(res.data);
            } catch (e) {
                // @ts-ignore
                message.error("获取刷题记录失败" + e.message);
            }
        };
        fetchDataList();
    }, [year]);

    // 格式化后端返回值
    const optionsData = dataList.map((dayOfYear) => {
        const dateStr = dayjs(`${year}-01-01`)
            .add(dayOfYear - 1, "day")
            .format("YYYY-MM-DD")
        return [dateStr, 1]
    })

    // 图表配置
    const options = {
        visualMap: {
            show: false,
            min: 0,
            max: 1,
            inRange: {
                // 颜色从灰色到浅绿色
                color: ["#efefef", "lightgreen"],
            },
        },
        calendar: {
            range: year,
            left: 20,
            // 单元格自动宽度，高度为 16 像素
            cellSize: ['auto', 16],
            yearLabel: {
                position: "top",
                formatter: `${year} 年刷题记录`,
            }
        },
        series: {
            type: "heatmap",
            coordinateSystem: "calendar",
            data: optionsData,
        },
    };

    return (
        <ReactECharts className="calendar-chart" option={options} />
    );
};

export default CalendarChart;
