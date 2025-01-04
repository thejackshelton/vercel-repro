import { c as createComponent, r as renderTemplate, a as addAttribute, b as renderHead, e as renderSlot, f as createAstro, g as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BffE2P5y.mjs';
import 'kleur/colors';
import { c as componentQrl, i as inlinedQrl, u as useSignal, a as _jsxC, b as _jsxQ, d as _noopQrl, e as _fnSignal, F as Fragment } from '../chunks/server_cTOof-xy.mjs';
import { s as styles } from '../chunks/index.95d291e9_CqxUmOHs.mjs';
export { renderers } from '../renderers.mjs';

const astroLogo = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20fill='none'%20viewBox='0%200%2097.5%20122.6'%20version='1.1'%20id='svg4'%20sodipodi:docname='astro.svg'%20width='97.5'%20height='122.6'%20inkscape:version='1.3.2%20(091e20ef0f,%202023-11-25)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3csodipodi:namedview%20id='namedview4'%20pagecolor='%23505050'%20bordercolor='%23ffffff'%20borderopacity='1'%20inkscape:showpageshadow='0'%20inkscape:pageopacity='0'%20inkscape:pagecheckerboard='1'%20inkscape:deskcolor='%23505050'%20inkscape:zoom='2.9375'%20inkscape:cx='48'%20inkscape:cy='61.106383'%20inkscape:window-width='1366'%20inkscape:window-height='683'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg4'%20/%3e%3cg%20id='g2'%20transform='translate(-16,-2.7)'%3e%3cpath%20d='m%2016,82.4%20c%200,0%2016.5,-8%2033,-8%20L%2061.4,36.1%20c%200.5,-2%201.8,-3.2%203.3,-3.2%201.6,0%203,1.3%203.4,3.2%20l%2012.4,38.3%20c%2019.6,0%2033,8%2033,8%20l%20-28,-76%20C%2084.7,4.1%2083.3,2.7%2081.5,2.7%20H%2048%20c%20-1.8,0%20-3.1,1.4%20-4,3.7%20z'%20id='path2'%20/%3e%3cpath%20d='m%2047.7,107.1%20c%20-5.5,-5%20-7.2,-15.7%20-4.9,-23.4%204,4.9%209.6,6.4%2015.4,7.3%208.9,1.3%2017.6,0.8%2025.9,-3.2%20l%202.8,-1.7%20a%2018,18%200%200%201%20-7.2,20%20l%20-5.5,3.8%20c%20-5.6,3.8%20-7.2,8.2%20-5,14.7%20l%200.2,0.7%20a%2014,14%200%200%201%20-6.6,-5.6%2015.8,15.8%200%200%201%20-2.6,-8.6%20c%200,-1.5%200,-3%20-0.2,-4.5%20-0.5,-3.7%20-2.2,-5.3%20-5.5,-5.4%20-3.3,-0.1%20-5.9,2%20-6.6,5.2%20z'%20id='path1'%20/%3e%3cpath%20fill='url(%23a)'%20d='m%2031.7,104.4%20c%20-5.5,-5%20-7.2,-15.7%20-4.9,-23.4%204,4.9%209.6,6.4%2015.4,7.3%208.9,1.3%2017.6,0.8%2025.9,-3.2%20l%202.8,-1.7%20a%2018,18%200%200%201%20-7.2,20%20l%20-5.5,3.8%20c%20-5.6,3.8%20-7.2,8.2%20-5,14.7%20l%200.2,0.7%20a%2014,14%200%200%201%20-6.6,-5.6%2015.8,15.8%200%200%201%20-2.6,-8.6%20c%200,-1.5%200,-3%20-0.2,-4.5%20-0.5,-3.7%20-2.2,-5.3%20-5.5,-5.4%20-3.3,-0.1%20-5.9,2%20-6.6,5.2%20z'%20id='path3'%20style='fill:url(%23a)'%20transform='translate(16,2.7)'%20/%3e%3c/g%3e%3cdefs%20id='defs4'%3e%3clinearGradient%20id='a'%20x1='64.699997'%20x2='77.400002'%20y1='119.2'%20y2='77.400002'%20gradientUnits='userSpaceOnUse'%20gradientTransform='translate(-16,-2.7)'%3e%3cstop%20stop-color='%23D83333'%20id='stop3'%20/%3e%3cstop%20offset='1'%20stop-color='%23F041FF'%20id='stop4'%20/%3e%3c/linearGradient%3e%3c/defs%3e%3cstyle%20id='style4'%3e%20g%20{%20fill:%20%23000;%20}%20@media%20(prefers-color-scheme:%20dark)%20{%20g%20{%20fill:%20%23FFF;%20}%20}%20%3c/style%3e%3c/svg%3e";

const qwikLogo = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'%20standalone='no'?%3e%3csvg%20width='321.14127'%20height='342.67004'%20viewBox='0%200%20321.14127%20342.67004'%20fill='none'%20version='1.1'%20id='svg3'%20sodipodi:docname='qwik.svg'%20inkscape:version='1.3.2%20(091e20ef0f,%202023-11-25)'%20xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape'%20xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:svg='http://www.w3.org/2000/svg'%3e%3csodipodi:namedview%20id='namedview3'%20pagecolor='%23505050'%20bordercolor='%23ffffff'%20borderopacity='1'%20inkscape:showpageshadow='0'%20inkscape:pageopacity='0'%20inkscape:pagecheckerboard='1'%20inkscape:deskcolor='%23505050'%20inkscape:zoom='0.752'%20inkscape:cx='163.56383'%20inkscape:cy='173.53723'%20inkscape:window-width='1366'%20inkscape:window-height='683'%20inkscape:window-x='0'%20inkscape:window-y='0'%20inkscape:window-maximized='1'%20inkscape:current-layer='svg3'%20/%3e%3cg%20clip-path='url(%23clip0_645_1322)'%20id='g3'%20transform='translate(-85.859381,-75.781942)'%3e%3cpath%20d='m%20367.865,418.452%20-61.166,-61.181%20-0.934,0.134%20v%20-0.671%20L%20175.687,227.529%20207.739,196.402%20188.908,87.7251%2099.5631,199.085%20c%20-15.2247,15.43%20-18.0293,40.519%20-7.0782,59.035%20l%2055.8241,93.113%20c%208.547,14.356%2024.039,22.943%2040.733,22.809%20l%2027.645,-0.269%20z'%20fill='%2318b6f6'%20id='path1'%20/%3e%3cpath%20d='m%20401.247,196.938%20-12.286,-22.809%20-6.411,-11.672%20-2.537,-4.562%20-0.267,0.268%20-33.655,-58.6316%20C%20337.677,84.7728%20321.918,75.6493%20304.824,75.7834%20l%20-29.515,0.805%20-88.009,0.2684%20c%20-16.694,0.1341%20-31.919,8.9893%20-40.332,23.3452%20L%2093.4141,207.001%20189.17,87.4562%20314.707,226.187%20l%20-22.303,22.674%2013.355,108.543%200.133,-0.268%20v%200.268%20h%20-0.267%20l%200.267,0.268%2010.417,10.197%2050.616,49.777%20c%202.137,2.012%205.609,-0.403%204.14,-2.952%20l%20-31.251,-61.852%2054.489,-101.297%201.736,-2.013%20c%200.668,-0.805%201.335,-1.61%201.87,-2.415%2010.683,-14.624%2012.153,-34.213%203.338,-50.179%20z'%20fill='%23ac7ef4'%20id='path2'%20/%3e%3c/g%3e%3cdefs%20id='defs3'%3e%3cclipPath%20id='clip0_645_1322'%3e%3crect%20width='500'%20height='500'%20fill='%23ffffff'%20id='rect3'%20x='0'%20y='0'%20/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

const s_lgApYiDbIS8 = () => {
  const count = useSignal(0);
  return /* @__PURE__ */ _jsxC(Fragment, {
    children: /* @__PURE__ */ _jsxQ("div", null, {
      class: styles.container
    }, /* @__PURE__ */ _jsxQ("button", null, {
      class: styles.counter,
      type: "button",
      onClick$: /* @__PURE__ */ _noopQrl("s_2x6uNXGChaw", [
        count
      ])
    }, [
      "count is ",
      _fnSignal((p0) => p0.value, [
        count
      ], "p0.value")
    ], 3, null), 3, null)
  }, 3, "u3_0");
};
const Counter = /* @__PURE__ */ componentQrl(/* @__PURE__ */ inlinedQrl(s_lgApYiDbIS8, "s_lgApYiDbIS8"));

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description" content="Qwik + Astro integration"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/Users/jackshelton/dev/playground/q-astro-vercel/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Qwik + Astro" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main id="app"> <div class="brand"> <a href="https://qwik.dev" target="_blank" rel="noreferrer"> <img${addAttribute(qwikLogo, "src")} class="logo qwik" alt="Qwik logo"> </a> <a href="https://github.com/QwikDev/astro" target="_blank" rel="noreferrer"> <span class="love">💜</span> </a> <a href="https://astro.build" target="_blank" rel="noreferrer"> <img${addAttribute(astroLogo, "src")} class="logo" alt="Astro logo"> </a> </div> <h1>Qwik + Astro</h1> <p class="motivation">
Thanks to <a href="https://github.com/QwikDev/astro" title="@QwikDev/astro integration">@QwikDev/astro</a>, seamlessly integrate your Qwik components into your Astro project, as shown with the counter below.
</p> ${renderComponent($$result2, "Counter", Counter, {})} <p class="read-the-docs">
Click on the Qwik and Astro logos to learn more
</p> </main> ` })} `;
}, "/Users/jackshelton/dev/playground/q-astro-vercel/src/pages/index.astro", void 0);

const $$file = "/Users/jackshelton/dev/playground/q-astro-vercel/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
