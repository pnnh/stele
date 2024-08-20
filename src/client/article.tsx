import React from "react";
import {RenderCodeBlock} from "@/parser/codeblock";
import {ArticleStyle} from "@/parser/style";

export function ArticleComponent({children}: {
    children: React.ReactNode
}) {
    return <div>
        <ArticleStyle/>
        {children}
        <RenderCodeBlock/>
    </div>
}
