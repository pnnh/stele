import React from "react";
import {TocItem} from "@/models/toc";
import {SteleBody} from "@/models/stele";
import {markdownToStele} from "@/parser/markdown";
import {buildNodeView} from "@/parser/view";

export function BuildBodyHtml(props: {
    tocList: Array<TocItem>, header: string, body: unknown,
    assetsUrl: string
}) {
    if (!props.body) return <></>
    let bodyObject: SteleBody | null = null
    if (props.header === 'stele' && typeof props.body === 'string') {
        bodyObject = JSON.parse(props.body)
        if (!bodyObject) return <>无效文档格式</>
        if (!bodyObject.name) bodyObject.name = 'body'
    } else if (props.header === 'markdown' && typeof props.body === 'string') {
        bodyObject = markdownToStele(props.body)
    }
    if (!bodyObject) return <>无效文档格式</>
    const children = bodyObject.children
    if (!children || children.length < 1) return <></>

    return <div>
        {buildNodeView(props.tocList, bodyObject, props.assetsUrl)}
    </div>
}
