import { Viewer } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
// 引入 github-markdown-css 样式 需要安装依赖 npm install github-markdown-css
import 'github-markdown-css/github-markdown-light.css'

interface Props {
    value?: string;
}

const plugins = [gfm(), highlight()];

/**
 * Markdown 浏览器
 * @param props
 * @constructor
 */
const MdViewer = (props: Props) => {
    const { value = "" } = props;

    return (
        <div className="md-viewer">
            <Viewer value={value} plugins={plugins} />
        </div>
    );
};

export default MdViewer;
