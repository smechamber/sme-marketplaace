(()=>{var a={};a.id=50,a.ids=[50],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},408:()=>{},846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1630:a=>{"use strict";a.exports=require("http")},1645:a=>{"use strict";a.exports=require("net")},1820:a=>{"use strict";a.exports=require("os")},3033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3873:a=>{"use strict";a.exports=require("path")},4075:a=>{"use strict";a.exports=require("zlib")},4273:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>C,patchFetch:()=>B,routeModule:()=>x,serverHooks:()=>A,workAsyncStorage:()=>y,workUnitAsyncStorage:()=>z});var d={};c.r(d),c.d(d,{POST:()=>w});var e=c(8106),f=c(8819),g=c(2050),h=c(8996),i=c(8730),j=c(261),k=c(6748),l=c(7462),m=c(6318),n=c(3949),o=c(6523),p=c(5393),q=c(1671),r=c(6704),s=c(6439),t=c(5262),u=c(4235),v=c(9049);async function w(a){try{let{inquiryData:b,inquiryType:c,itemData:d,buyerInfo:e,sellerInfo:f}=await a.json();if(!b||!c||!d||!e||!f)return u.NextResponse.json({error:"Missing required data for sending emails"},{status:400});let g=v.createTransport({host:process.env.SMTP_HOST||"smtp.gmail.com",port:587,secure:!1,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},tls:{ciphers:"SSLv3",rejectUnauthorized:!1}}),h=[],i=((a,b,c,d,e)=>{let f="product"===b;return{subject:`New ${f?"Product Inquiry":"Requirement Proposal"} - Approval Required`,html:`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
        New ${f?"Product Inquiry":"Requirement Proposal"}
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">Inquiry Details</h3>
        <p><strong>Type:</strong> ${f?"Product Inquiry":"Requirement Proposal"}</p>
        <p><strong>Item:</strong> ${c?.title||c?.quoteFor||"N/A"}</p>
        ${c?.price?`<p><strong>Price:</strong> $${c.price}</p>`:""}
        <p><strong>Message:</strong></p>
        <div style="background-color: white; padding: 10px; border-left: 3px solid #007bff; margin: 10px 0;">
          ${a.message}
        </div>
      </div>

      <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #28a745; margin-top: 0;">${f?"Buyer":"Seller"} Information</h3>
        <p><strong>Name:</strong> ${d?.name||"N/A"}</p>
        <p><strong>Email:</strong> ${d?.email||"N/A"}</p>
      </div>

      <div style="background-color: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #dc3545; margin-top: 0;">${f?"Seller":"Buyer"} Information</h3>
        <p><strong>Name:</strong> ${e?.name||"N/A"}</p>
        <p><strong>Email:</strong> ${e?.email||"N/A"}</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_ADMIN_PANEL_URL}" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
          Go to Admin Panel
        </a>
      </div>

      <div style="border-top: 1px solid #dee2e6; padding-top: 15px; margin-top: 30px; color: #6c757d; font-size: 12px;">
        <p>This inquiry requires your approval before the parties can start chatting.</p>
        <p>Please review and approve/reject this inquiry from the admin panel.</p>
      </div>
    </div>
  `}})(b,c,d,e,f);h.push({from:process.env.SMTP_USER,to:process.env.SMTP_USER,subject:i.subject,html:i.html});let j=((a,b,c,d=!1)=>{let e,f,g="product"===b;return d?(e=`New ${g?"Inquiry":"Proposal"} for Your ${g?"Product":"Requirement"}`,f=g?"You have received a new inquiry for your product!":"You have received a new proposal for your requirement!"):(e=`${g?"Inquiry":"Proposal"} Submitted Successfully`,f=`Your ${g?"inquiry":"proposal"} has been submitted successfully!`),{subject:e,html:`
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #28a745; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
        ${f}
      </h2>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #007bff; margin-top: 0;">${g?"Product":"Requirement"} Details</h3>
        <p><strong>Item:</strong> ${c?.title||c?.quoteFor||"N/A"}</p>
        ${c?.price?`<p><strong>Price:</strong> $${c.price}</p>`:""}
        <p><strong>Your Message:</strong></p>
        <div style="background-color: white; padding: 10px; border-left: 3px solid #28a745; margin: 10px 0;">
          ${a.message}
        </div>
      </div>

      <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
        <h3 style="color: #856404; margin-top: 0;">What's Next?</h3>
        <p style="color: #856404; margin-bottom: 0;">
          Your ${g?"inquiry":"proposal"} is currently under review by our admin team. 
          You'll receive a notification once it's approved and you can start chatting with the ${g?"seller":"buyer"}.
        </p>
      </div>

      <div style="border-top: 1px solid #dee2e6; padding-top: 15px; margin-top: 30px; color: #6c757d; font-size: 12px;">
        <p>Thank you for using our platform!</p>
        <p>If you have any questions, please contact our support team.</p>
      </div>
    </div>
  `}})(b,c,d,!1);h.push({from:process.env.SMTP_USER,to:e.email,subject:j.subject,html:j.html});let k=h.map(a=>g.sendMail(a));return await Promise.all(k),u.NextResponse.json({success:!0,message:"All notification emails sent successfully"})}catch(a){return console.error("Error sending inquiry emails:",a),u.NextResponse.json({error:"Failed to send notification emails",details:a.message},{status:500})}}let x=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/send-inquiry-emails/route",pathname:"/api/send-inquiry-emails",filename:"route",bundlePath:"app/api/send-inquiry-emails/route"},distDir:".next",projectDir:"",resolvedPagePath:"C:\\Users\\Admin\\Desktop\\Abhishek\\sme-marketplaace\\apps\\api\\app\\api\\send-inquiry-emails\\route.js",nextConfigOutput:"",userland:d}),{workAsyncStorage:y,workUnitAsyncStorage:z,serverHooks:A}=x;function B(){return(0,g.patchFetch)({workAsyncStorage:y,workUnitAsyncStorage:z})}async function C(a,b,c){var d;let e="/api/send-inquiry-emails/route";"/index"===e&&(e="/");let g=await x.prepare(a,b,{srcPage:e,multiZoneDraftMode:"false"});if(!g)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:u,params:v,nextConfig:w,isDraftMode:y,prerenderManifest:z,routerServerContext:A,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,resolvedPathname:D}=g,E=(0,j.normalizeAppPath)(e),F=!!(z.dynamicRoutes[E]||z.routes[D]);if(F&&!y){let a=!!z.routes[D],b=z.dynamicRoutes[E];if(b&&!1===b.fallback&&!a)throw new s.NoFallbackError}let G=null;!F||x.isDev||y||(G="/index"===(G=D)?"/":G);let H=!0===x.isDev||!F,I=F&&!H,J=a.method||"GET",K=(0,i.getTracer)(),L=K.getActiveScopeSpan(),M={params:v,prerenderManifest:z,renderOpts:{experimental:{dynamicIO:!!w.experimental.dynamicIO,authInterrupts:!!w.experimental.authInterrupts},supportsDynamicResponse:H,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:null==(d=w.experimental)?void 0:d.cacheLife,isRevalidate:I,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d)=>x.onRequestError(a,b,d,A)},sharedContext:{buildId:u}},N=new k.NodeNextRequest(a),O=new k.NodeNextResponse(b),P=l.NextRequestAdapter.fromNodeNextRequest(N,(0,l.signalFromNodeResponse)(b));try{let d=async c=>x.handle(P,M).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=K.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${J} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${J} ${a.url}`)}),g=async g=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!(0,h.getRequestMeta)(a,"minimalMode")&&B&&C&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let e=await d(g);a.fetchMetrics=M.renderOpts.fetchMetrics;let i=M.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=M.renderOpts.collectedTags;if(!F)return await (0,o.I)(N,O,e,M.renderOpts.pendingWaitUntil),null;{let a=await e.blob(),b=(0,p.toNodeOutgoingHttpHeaders)(e.headers);j&&(b[r.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=r.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,d=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=r.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:t.CachedRouteKind.APP_ROUTE,status:e.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:d}}}}catch(b){throw(null==f?void 0:f.isStale)&&await x.onRequestError(a,b,{routerKind:"App Router",routePath:e,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})},A),b}},l=await x.handleResponse({req:a,nextConfig:w,cacheKey:G,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:z,isRoutePPREnabled:!1,isOnDemandRevalidate:B,revalidateOnlyGenerated:C,responseGenerator:k,waitUntil:c.waitUntil});if(!F)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==t.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,h.getRequestMeta)(a,"minimalMode")||b.setHeader("x-nextjs-cache",B?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),y&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,p.fromNodeOutgoingHttpHeaders)(l.value.headers);return(0,h.getRequestMeta)(a,"minimalMode")&&F||m.delete(r.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,q.U)(l.cacheControl)),await (0,o.I)(N,O,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};L?await g(L):await K.withPropagatedContext(a.headers,()=>K.trace(m.BaseServerSpan.handleRequest,{spanName:`${J} ${a.url}`,kind:i.SpanKind.SERVER,attributes:{"http.method":J,"http.target":a.url}},g))}catch(b){if(L||b instanceof s.NoFallbackError||await x.onRequestError(a,b,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:B})}),F)throw b;return await (0,o.I)(N,O,new Response(null,{status:500})),null}}},4631:a=>{"use strict";a.exports=require("tls")},4735:a=>{"use strict";a.exports=require("events")},4870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4985:a=>{"use strict";a.exports=require("dns")},5511:a=>{"use strict";a.exports=require("crypto")},5591:a=>{"use strict";a.exports=require("https")},6439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},7032:()=>{},7910:a=>{"use strict";a.exports=require("stream")},8354:a=>{"use strict";a.exports=require("util")},9021:a=>{"use strict";a.exports=require("fs")},9294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9551:a=>{"use strict";a.exports=require("url")},9646:a=>{"use strict";a.exports=require("child_process")}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[572,235,49],()=>b(b.s=4273));module.exports=c})();