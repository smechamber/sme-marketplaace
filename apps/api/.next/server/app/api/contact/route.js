(()=>{var a={};a.id=746,a.ids=[746],a.modules={261:a=>{"use strict";a.exports=require("next/dist/shared/lib/router/utils/app-paths")},408:()=>{},846:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1630:a=>{"use strict";a.exports=require("http")},1645:a=>{"use strict";a.exports=require("net")},1820:a=>{"use strict";a.exports=require("os")},3033:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:a=>{"use strict";a.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3873:a=>{"use strict";a.exports=require("path")},4075:a=>{"use strict";a.exports=require("zlib")},4631:a=>{"use strict";a.exports=require("tls")},4735:a=>{"use strict";a.exports=require("events")},4870:a=>{"use strict";a.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},4985:a=>{"use strict";a.exports=require("dns")},5511:a=>{"use strict";a.exports=require("crypto")},5591:a=>{"use strict";a.exports=require("https")},6439:a=>{"use strict";a.exports=require("next/dist/shared/lib/no-fallback-error.external")},7032:()=>{},7910:a=>{"use strict";a.exports=require("stream")},8354:a=>{"use strict";a.exports=require("util")},9021:a=>{"use strict";a.exports=require("fs")},9294:a=>{"use strict";a.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9551:a=>{"use strict";a.exports=require("url")},9646:a=>{"use strict";a.exports=require("child_process")},9817:(a,b,c)=>{"use strict";c.r(b),c.d(b,{handler:()=>H,patchFetch:()=>G,routeModule:()=>C,serverHooks:()=>F,workAsyncStorage:()=>D,workUnitAsyncStorage:()=>E});var d={};c.r(d),c.d(d,{POST:()=>B});var e=c(8106),f=c(8819),g=c(2050),h=c(8996),i=c(8730),j=c(261),k=c(6748),l=c(7462),m=c(6318),n=c(3949),o=c(6523),p=c(5393),q=c(1671),r=c(6704),s=c(6439),t=c(5262),u=c(9049),v=c(4235),w=c(5208);let x=new Map,y=new Set;async function z(a){let b=await (0,w.b3)();return b.get("x-forwarded-for")?.split(",")[0]?.trim()||b.get("x-real-ip")||b.get("cf-connecting-ip")||"unknown"}function A(a){return"string"!=typeof a?"":a.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,"")}async function B(a){try{var b,c;let d=await z(a);console.log(`Contact form submission from IP: ${d}`);let e=function(a){let b=Date.now();if(y.has(a))return{allowed:!1,reason:"IP_BLOCKED"};x.has(a)||x.set(a,{count:0,windowStart:b});let c=x.get(a);return(b-c.windowStart>9e5&&(c.count=0,c.windowStart=b),c.count>=5)?(y.add(a),setTimeout(()=>{y.delete(a)},36e5),{allowed:!1,reason:"RATE_LIMIT_EXCEEDED"}):(c.count++,{allowed:!0})}(d);if(!e.allowed){let a="IP_BLOCKED"===e.reason?"Your IP has been temporarily blocked due to excessive requests":"Too many requests. Please try again later.";return v.NextResponse.json({message:a,retryAfter:"IP_BLOCKED"===e.reason?36e5:9e5},{status:429})}let{name:f,email:g,phone:h,subject:i,message:j}=await a.json();if(!f||!g||!i||!j)return v.NextResponse.json({message:"Please fill in all required fields"},{status:400});let k={name:A(f),email:A(g),phone:A(h),subject:A(i),message:A(j)};if(b=k.email,!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b))return v.NextResponse.json({message:"Please enter a valid email address"},{status:400});if(k.phone&&!(!(c=k.phone)||/^\+?[\d\s\-\(\)]{10,}$/.test(c)))return v.NextResponse.json({message:"Please enter a valid phone number"},{status:400});if(k.name.length<2||k.name.length>100)return v.NextResponse.json({message:"Name must be between 2 and 100 characters"},{status:400});if(k.subject.length<5||k.subject.length>200)return v.NextResponse.json({message:"Subject must be between 5 and 200 characters"},{status:400});if(k.message.length<10||k.message.length>2e3)return v.NextResponse.json({message:"Message must be between 10 and 2000 characters"},{status:400});let l=u.createTransport({host:process.env.SMTP_HOST||"smtp.gmail.com",port:587,secure:!1,auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},tls:{ciphers:"SSLv3",rejectUnauthorized:!1}}),m={from:process.env.SMTP_USER,to:process.env.SMTP_USER,subject:`New Contact Form Submission: ${k.subject}`,replyTo:k.email,html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="background-color: #29688A; color: white; padding: 20px; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px;">
            <h2 style="margin: 0;">New Contact Form Submission</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">SME Market Place</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #29688A; border-bottom: 2px solid #f0f0f0; padding-bottom: 5px;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; font-weight: bold; width: 120px; vertical-align: top;">Name:</td>
                <td style="padding: 8px;">${k.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; vertical-align: top;">Email:</td>
                <td style="padding: 8px;"><a href="mailto:${k.email}" style="color: #29688A;">${k.email}</a></td>
              </tr>
              ${k.phone?`
              <tr>
                <td style="padding: 8px; font-weight: bold; vertical-align: top;">Phone:</td>
                <td style="padding: 8px;"><a href="tel:${k.phone}" style="color: #29688A;">${k.phone}</a></td>
              </tr>
              `:""}
              <tr>
                <td style="padding: 8px; font-weight: bold; vertical-align: top;">Subject:</td>
                <td style="padding: 8px;">${k.subject}</td>
              </tr>
              
              <tr>
                <td style="padding: 8px; font-weight: bold; vertical-align: top;">Submitted:</td>
                <td style="padding: 8px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #29688A; border-bottom: 2px solid #f0f0f0; padding-bottom: 5px;">Message</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap; font-family: Arial, sans-serif; line-height: 1.5;">${k.message}</div>
          </div>
          
          <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; border-left: 4px solid #29688A;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Quick Actions:</strong><br>
              • Reply to: <a href="mailto:${k.email}" style="color: #29688A;">${k.email}</a><br>
              ${k.phone?`• Call: <a href="tel:${k.phone}" style="color: #29688A;">${k.phone}</a><br>`:""}
              • This message was sent via the SME Market Place contact form
            </p>
          </div>
        </div>
      `},n={from:process.env.SMTP_USER,to:k.email,subject:"Thank you for contacting SME Market Place",html:`
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <div style="background-color: #29688A; color: white; padding: 20px; border-radius: 8px 8px 0 0; margin: -20px -20px 20px -20px;">
            <h2 style="margin: 0;">Thank You for Contacting Us!</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">SME Market Place</p>
          </div>
          
          <p>Dear ${k.name},</p>
          
          <p>Thank you for reaching out to SME Market Place. We have successfully received your message and will get back to you as soon as possible.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #29688A;">Your Message Summary:</h3>
            <p><strong>Subject:</strong> ${k.subject}</p>
            <p><strong>Message:</strong> ${k.message}</p>
            <p><strong>Submitted on:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <p>In the meantime, you can reach us directly at:</p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 10px;">📧 <a href="mailto:secretariat@smechamber.com" style="color: #29688A;">secretariat@smechamber.com</a></li>
            <li style="margin-bottom: 10px;">📧 <a href="mailto:director@smechamber.com" style="color: #29688A;">director@smechamber.com</a></li>
            <li style="margin-bottom: 10px;">📞 <a href="tel:+912269511111" style="color: #29688A;">+ 91 – 22 – 6951 1111</a></li>
          </ul>
          
          <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; border-left: 4px solid #29688A; margin-top: 20px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>SME Chamber of India</strong><br>
              Samruddhi Venture Park, Office No. 1, 3rd Floor,<br>
              Krantiveer Lakhuji Salve Marg, adjoining Hotel Tunga Paradise,<br>
              next to Akruti Centre, Andheri East, Mumbai, Maharashtra 400093
            </p>
          </div>
          
          <p style="margin-top: 20px;">Best regards,<br><strong>SME Market Place Team</strong></p>
        </div>
      `};return await Promise.all([l.sendMail(m),l.sendMail(n)]),console.log(`Contact form email sent successfully for ${k.email}`),v.NextResponse.json({message:"Message sent successfully! We will get back to you soon."})}catch(a){return console.error("Contact form error:",a),v.NextResponse.json({message:"Sorry, there was an error sending your message. Please try again later."},{status:500})}}setInterval(()=>{let a=Date.now();for(let[b,c]of x.entries())a-c.windowStart>9e5&&x.delete(b)},9e5);let C=new e.AppRouteRouteModule({definition:{kind:f.RouteKind.APP_ROUTE,page:"/api/contact/route",pathname:"/api/contact",filename:"route",bundlePath:"app/api/contact/route"},distDir:".next",projectDir:"",resolvedPagePath:"C:\\Users\\Admin\\Desktop\\Abhishek\\sme-marketplaace\\apps\\api\\app\\api\\contact\\route.js",nextConfigOutput:"",userland:d}),{workAsyncStorage:D,workUnitAsyncStorage:E,serverHooks:F}=C;function G(){return(0,g.patchFetch)({workAsyncStorage:D,workUnitAsyncStorage:E})}async function H(a,b,c){var d;let e="/api/contact/route";"/index"===e&&(e="/");let g=await C.prepare(a,b,{srcPage:e,multiZoneDraftMode:"false"});if(!g)return b.statusCode=400,b.end("Bad Request"),null==c.waitUntil||c.waitUntil.call(c,Promise.resolve()),null;let{buildId:u,params:v,nextConfig:w,isDraftMode:x,prerenderManifest:y,routerServerContext:z,isOnDemandRevalidate:A,revalidateOnlyGenerated:B,resolvedPathname:D}=g,E=(0,j.normalizeAppPath)(e),F=!!(y.dynamicRoutes[E]||y.routes[D]);if(F&&!x){let a=!!y.routes[D],b=y.dynamicRoutes[E];if(b&&!1===b.fallback&&!a)throw new s.NoFallbackError}let G=null;!F||C.isDev||x||(G="/index"===(G=D)?"/":G);let H=!0===C.isDev||!F,I=F&&!H,J=a.method||"GET",K=(0,i.getTracer)(),L=K.getActiveScopeSpan(),M={params:v,prerenderManifest:y,renderOpts:{experimental:{dynamicIO:!!w.experimental.dynamicIO,authInterrupts:!!w.experimental.authInterrupts},supportsDynamicResponse:H,incrementalCache:(0,h.getRequestMeta)(a,"incrementalCache"),cacheLifeProfiles:null==(d=w.experimental)?void 0:d.cacheLife,isRevalidate:I,waitUntil:c.waitUntil,onClose:a=>{b.on("close",a)},onAfterTaskError:void 0,onInstrumentationRequestError:(b,c,d)=>C.onRequestError(a,b,d,z)},sharedContext:{buildId:u}},N=new k.NodeNextRequest(a),O=new k.NodeNextResponse(b),P=l.NextRequestAdapter.fromNodeNextRequest(N,(0,l.signalFromNodeResponse)(b));try{let d=async c=>C.handle(P,M).finally(()=>{if(!c)return;c.setAttributes({"http.status_code":b.statusCode,"next.rsc":!1});let d=K.getRootSpanAttributes();if(!d)return;if(d.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${d.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let e=d.get("next.route");if(e){let a=`${J} ${e}`;c.setAttributes({"next.route":e,"http.route":e,"next.span_name":a}),c.updateName(a)}else c.updateName(`${J} ${a.url}`)}),g=async g=>{var i,j;let k=async({previousCacheEntry:f})=>{try{if(!(0,h.getRequestMeta)(a,"minimalMode")&&A&&B&&!f)return b.statusCode=404,b.setHeader("x-nextjs-cache","REVALIDATED"),b.end("This page could not be found"),null;let e=await d(g);a.fetchMetrics=M.renderOpts.fetchMetrics;let i=M.renderOpts.pendingWaitUntil;i&&c.waitUntil&&(c.waitUntil(i),i=void 0);let j=M.renderOpts.collectedTags;if(!F)return await (0,o.I)(N,O,e,M.renderOpts.pendingWaitUntil),null;{let a=await e.blob(),b=(0,p.toNodeOutgoingHttpHeaders)(e.headers);j&&(b[r.NEXT_CACHE_TAGS_HEADER]=j),!b["content-type"]&&a.type&&(b["content-type"]=a.type);let c=void 0!==M.renderOpts.collectedRevalidate&&!(M.renderOpts.collectedRevalidate>=r.INFINITE_CACHE)&&M.renderOpts.collectedRevalidate,d=void 0===M.renderOpts.collectedExpire||M.renderOpts.collectedExpire>=r.INFINITE_CACHE?void 0:M.renderOpts.collectedExpire;return{value:{kind:t.CachedRouteKind.APP_ROUTE,status:e.status,body:Buffer.from(await a.arrayBuffer()),headers:b},cacheControl:{revalidate:c,expire:d}}}}catch(b){throw(null==f?void 0:f.isStale)&&await C.onRequestError(a,b,{routerKind:"App Router",routePath:e,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:A})},z),b}},l=await C.handleResponse({req:a,nextConfig:w,cacheKey:G,routeKind:f.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:y,isRoutePPREnabled:!1,isOnDemandRevalidate:A,revalidateOnlyGenerated:B,responseGenerator:k,waitUntil:c.waitUntil});if(!F)return null;if((null==l||null==(i=l.value)?void 0:i.kind)!==t.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==l||null==(j=l.value)?void 0:j.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,h.getRequestMeta)(a,"minimalMode")||b.setHeader("x-nextjs-cache",A?"REVALIDATED":l.isMiss?"MISS":l.isStale?"STALE":"HIT"),x&&b.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,p.fromNodeOutgoingHttpHeaders)(l.value.headers);return(0,h.getRequestMeta)(a,"minimalMode")&&F||m.delete(r.NEXT_CACHE_TAGS_HEADER),!l.cacheControl||b.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,q.U)(l.cacheControl)),await (0,o.I)(N,O,new Response(l.value.body,{headers:m,status:l.value.status||200})),null};L?await g(L):await K.withPropagatedContext(a.headers,()=>K.trace(m.BaseServerSpan.handleRequest,{spanName:`${J} ${a.url}`,kind:i.SpanKind.SERVER,attributes:{"http.method":J,"http.target":a.url}},g))}catch(b){if(L||b instanceof s.NoFallbackError||await C.onRequestError(a,b,{routerKind:"App Router",routePath:E,routeType:"route",revalidateReason:(0,n.c)({isRevalidate:I,isOnDemandRevalidate:A})}),F)throw b;return await (0,o.I)(N,O,new Response(null,{status:500})),null}}}};var b=require("../../../webpack-runtime.js");b.C(a);var c=b.X(0,[572,235,208,49],()=>b(b.s=9817));module.exports=c})();