import {css} from "@emotion/css";

export const styles = {
    steleEditor: css`
        border: 1px solid #edebe9;margin-bottom: 16px;
        min-height: 400px;
    `,
    body: css`
        margin-bottom: 16px;overflow-x: hidden;margin-top:0;padding:16px;
    `,
    elementActive: css`
        background-color: rgba(224, 241, 255, 0.3);
    `,
    actions: css`
        display: flex;
        justify-content: space-between;
    `,
    actionsInvisible: css`
        display: flex;
        justify-content: space-between;
        visibility: hidden;
    `,
    left: css`
        display: flex;
    `,
    extra: css`
        display: inline-block;
        margin-left: 8px;
    `,
    iconButton: css`
        border: none; background: none;color:#0078d4;
        padding: 4px; cursor: pointer;
        i {
            font-size: 16px;
            vertical-align: middle;
        }
    `
}