import React from "react";
import {RenderCodeBlock} from "./codeblock";
import {ArticleStyle} from "./style";

export function ArticleComponent({children}: {
    children: React.ReactNode
}) {
    return <div>
        <ArticleStyle/>
        {children}
        <RenderCodeBlock/>
    </div>
}
