"use strict";(self.webpackChunk_docs_gh_pages=self.webpackChunk_docs_gh_pages||[]).push([[13],{6448:function(e,t,a){a.d(t,{Z:function(){return p}});var r=a(5819),n=a(3929),l=a(4722),s=a(28),c=a(2203),i="sidebar_GOS5",m="sidebarItemTitle_48Nh",o="sidebarItemList_xeUe",u="sidebarItem_voZO",g="sidebarItemLink_MnTO",d="sidebarItemLinkActive_UScL",v=a(9437);function b(e){var t=e.sidebar;return 0===t.items.length?null:n.createElement("nav",{className:(0,l.Z)(i,"thin-scrollbar"),"aria-label":(0,v.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},n.createElement("div",{className:(0,l.Z)(m,"margin-bottom--md")},t.title),n.createElement("ul",{className:o},t.items.map((function(e){return n.createElement("li",{key:e.permalink,className:u},n.createElement(c.Z,{isNavLink:!0,to:e.permalink,className:g,activeClassName:d},e.title))}))))}var E=["sidebar","toc","children"];var p=function(e){var t=e.sidebar,a=e.toc,c=e.children,i=(0,r.Z)(e,E),m=t&&t.items.length>0;return n.createElement(s.Z,i,n.createElement("div",{className:"container margin-vert--lg"},n.createElement("div",{className:"row"},m&&n.createElement("aside",{className:"col col--3"},n.createElement(b,{sidebar:t})),n.createElement("main",{className:(0,l.Z)("col",{"col--7":m,"col--9 col--offset-1":!m}),itemScope:!0,itemType:"http://schema.org/Blog"},c),a&&n.createElement("div",{className:"col col--2"},a))))}},6598:function(e,t,a){a.r(t),a.d(t,{default:function(){return o}});var r=a(3929),n=a(6448),l=a(1240),s=a(2128),c="tag_PG4J";function i(e){var t=e.letterEntry;return r.createElement("article",null,r.createElement("h2",null,t.letter),r.createElement("ul",{className:"padding--none"},t.tags.map((function(e){return r.createElement("li",{key:e.permalink,className:c},r.createElement(l.Z,e))}))),r.createElement("hr",null))}var m=function(e){var t=e.tags,a=(0,s.PZ)(t);return r.createElement("section",{className:"margin-vert--lg"},a.map((function(e){return r.createElement(i,{key:e.letter,letterEntry:e})})))};var o=function(e){var t=e.tags,a=e.sidebar,l=(0,s.MA)();return r.createElement(n.Z,{title:l,wrapperClassName:s.kM.wrapper.blogPages,pageClassName:s.kM.page.blogTagsListPage,searchMetadatas:{tag:"blog_tags_list"},sidebar:a},r.createElement("h1",null,l),r.createElement(m,{tags:Object.values(t)}))}},1240:function(e,t,a){a.d(t,{Z:function(){return m}});var r=a(3929),n=a(4722),l=a(2203),s="tag_hRBR",c="tagRegular_19f3",i="tagWithCount_eeI5";var m=function(e){var t,a=e.permalink,m=e.name,o=e.count;return r.createElement(l.Z,{href:a,className:(0,n.Z)(s,(t={},t[c]=!o,t[i]=o,t))},m,o&&r.createElement("span",null,o))}}}]);