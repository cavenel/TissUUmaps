require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    /*******************************************************************************
     *                                                                              *
     * Author    :  Angus Johnson                                                   *
     * Version   :  6.4.2                                                           *
     * Date      :  27 February 2017                                                *
     * Website   :  http://www.angusj.com                                           *
     * Copyright :  Angus Johnson 2010-2017                                         *
     *                                                                              *
     * License:                                                                     *
     * Use, modification & distribution is subject to Boost Software License Ver 1. *
     * http://www.boost.org/LICENSE_1_0.txt                                         *
     *                                                                              *
     * Attributions:                                                                *
     * The code in this library is an extension of Bala Vatti's clipping algorithm: *
     * "A generic solution to polygon clipping"                                     *
     * Communications of the ACM, Vol 35, Issue 7 (July 1992) pp 56-63.             *
     * http://portal.acm.org/citation.cfm?id=129906                                 *
     *                                                                              *
     * Computer graphics and geometric modeling: implementation and algorithms      *
     * By Max K. Agoston                                                            *
     * Springer; 1 edition (January 4, 2005)                                        *
     * http://books.google.com/books?q=vatti+clipping+agoston                       *
     *                                                                              *
     * See also:                                                                    *
     * "Polygon Offsetting by Computing Winding Numbers"                            *
     * Paper no. DETC2005-85513 pp. 565-575                                         *
     * ASME 2005 International Design Engineering Technical Conferences             *
     * and Computers and Information in Engineering Conference (IDETC/CIE2005)      *
     * September 24-28, 2005 , Long Beach, California, USA                          *
     * http://www.me.berkeley.edu/~mcmains/pubs/DAC05OffsetPolygon.pdf              *
     *                                                                              *
     *******************************************************************************/
    /*******************************************************************************
     *                                                                              *
     * Author    :  Timo                                                            *
     * Version   :  6.4.2.2 (FPoint)                                                *
     * Date      :  8 September 2017                                                *
     *                                                                              *
     * This is a translation of the C# Clipper library to Javascript.               *
     *                                                                              *
     *******************************************************************************/
    (function(){var c={version:"6.4.2.2",use_lines:!0,use_xyz:!1};var r=!1;"undefined"!==typeof module&&module.exports?(module.exports=c,r=!0):"undefined"!==typeof document?window.ClipperLib=c:self.ClipperLib=c;r=r?"chrome":navigator.userAgent.toString().toLowerCase();-1!=r.indexOf("chrome")&&r.indexOf("chromium");r.indexOf("chromium");-1!=r.indexOf("safari")&&-1==r.indexOf("chrome")&&r.indexOf("chromium");r.indexOf("firefox");r.indexOf("firefox/17");r.indexOf("firefox/15");r.indexOf("firefox/3");r.indexOf("opera");
    r.indexOf("msie 10");r.indexOf("msie 9");r.indexOf("msie 8");r.indexOf("msie 7");r.indexOf("msie ");r=function(a,b){var d;if("undefined"===typeof Object.getOwnPropertyNames)for(d in b.prototype){if("undefined"===typeof a.prototype[d]||a.prototype[d]===Object.prototype[d])a.prototype[d]=b.prototype[d]}else for(var c=Object.getOwnPropertyNames(b.prototype),f=0;f<c.length;f++)"undefined"===typeof Object.getOwnPropertyDescriptor(a.prototype,c[f])&&Object.defineProperty(a.prototype,c[f],Object.getOwnPropertyDescriptor(b.prototype,
    c[f]));for(d in b)"undefined"===typeof a[d]&&(a[d]=b[d]);a.$baseCtor=b};c.Path=function(){return[]};c.Path.prototype.push=Array.prototype.push;c.Paths=function(){return[]};c.Paths.prototype.push=Array.prototype.push;c.PolyNode=function(){this.m_Parent=null;this.m_polygon=new c.Path;this.m_endtype=this.m_jointype=this.m_Index=0;this.m_Childs=[];this.IsOpen=!1};c.PolyNode.prototype.IsHoleNode=function(){for(var a=!0,b=this.m_Parent;null!==b;)a=!a,b=b.m_Parent;return a};c.PolyNode.prototype.ChildCount=
    function(){return this.m_Childs.length};c.PolyNode.prototype.Contour=function(){return this.m_polygon};c.PolyNode.prototype.AddChild=function(a){var b=this.m_Childs.length;this.m_Childs.push(a);a.m_Parent=this;a.m_Index=b};c.PolyNode.prototype.GetNext=function(){return 0<this.m_Childs.length?this.m_Childs[0]:this.GetNextSiblingUp()};c.PolyNode.prototype.GetNextSiblingUp=function(){return null===this.m_Parent?null:this.m_Index===this.m_Parent.m_Childs.length-1?this.m_Parent.GetNextSiblingUp():this.m_Parent.m_Childs[this.m_Index+
    1]};c.PolyNode.prototype.Childs=function(){return this.m_Childs};c.PolyNode.prototype.Parent=function(){return this.m_Parent};c.PolyNode.prototype.IsHole=function(){return this.IsHoleNode()};c.PolyTree=function(){this.m_AllPolys=[];c.PolyNode.call(this)};c.PolyTree.prototype.Clear=function(){for(var a=0,b=this.m_AllPolys.length;a<b;a++)this.m_AllPolys[a]=null;this.m_AllPolys.length=0;this.m_Childs.length=0};c.PolyTree.prototype.GetFirst=function(){return 0<this.m_Childs.length?this.m_Childs[0]:null};
    c.PolyTree.prototype.Total=function(){var a=this.m_AllPolys.length;0<a&&this.m_Childs[0]!==this.m_AllPolys[0]&&a--;return a};r(c.PolyTree,c.PolyNode);c.Clear=function(a){a.length=0};c.PI=3.141592653589793;c.PI2=6.283185307179586;c.FPoint=function(){var a=arguments;var b=a.length;this.Y=this.X=0;c.use_xyz?(this.Z=0,3===b?(this.X=a[0],this.Y=a[1],this.Z=a[2]):2===b?(this.X=a[0],this.Y=a[1],this.Z=0):1===b?a[0]instanceof c.FPoint?(a=a[0],this.X=a.X,this.Y=a.Y,this.Z=0):(a=a[0],"undefined"===typeof a.Z&&
    (a.Z=0),this.X=a.X,this.Y=a.Y,this.Z=a.Z):this.Z=this.Y=this.X=0):2===b?(this.X=a[0],this.Y=a[1]):1===b?(a=a[0],this.X=a.X,this.Y=a.Y):this.Y=this.X=0};c.FPoint.op_Equality=function(a,b){return a.X===b.X&&a.Y===b.Y};c.FPoint.op_Inequality=function(a,b){return a.X!==b.X||a.Y!==b.Y};c.FPoint0=function(){this.Y=this.X=0;c.use_xyz&&(this.Z=0)};c.FPoint0.prototype=c.FPoint.prototype;c.FPoint1=function(a){this.X=a.X;this.Y=a.Y;c.use_xyz&&(this.Z="undefined"===typeof a.Z?0:a.Z)};c.FPoint1.prototype=c.FPoint.prototype;
    c.FPoint1dp=function(a){this.X=a.X;this.Y=a.Y;c.use_xyz&&(this.Z=0)};c.FPoint1dp.prototype=c.FPoint.prototype;c.FPoint2=function(a,b,d){this.X=a;this.Y=b;c.use_xyz&&(this.Z="undefined"===typeof d?0:d)};c.FPoint2.prototype=c.FPoint.prototype;c.FRect=function(){var a=arguments,b=a.length;4===b?(this.left=a[0],this.top=a[1],this.right=a[2],this.bottom=a[3]):1===b?(a=a[0],this.left=a.left,this.top=a.top,this.right=a.right,this.bottom=a.bottom):this.bottom=this.right=this.top=this.left=0};c.FRect0=function(){this.bottom=
    this.right=this.top=this.left=0};c.FRect0.prototype=c.FRect.prototype;c.FRect1=function(a){this.left=a.left;this.top=a.top;this.right=a.right;this.bottom=a.bottom};c.FRect1.prototype=c.FRect.prototype;c.FRect4=function(a,b,d,c){this.left=a;this.top=b;this.right=d;this.bottom=c};c.FRect4.prototype=c.FRect.prototype;c.ClipType={ctIntersection:0,ctUnion:1,ctDifference:2,ctXor:3};c.PolyType={ptSubject:0,ptClip:1};c.PolyFillType={pftEvenOdd:0,pftNonZero:1,pftPositive:2,pftNegative:3};c.JoinType={jtSquare:0,
    jtRound:1,jtMiter:2};c.EndType={etOpenSquare:0,etOpenRound:1,etOpenButt:2,etClosedLine:3,etClosedPolygon:4};c.EdgeSide={esLeft:0,esRight:1};c.Direction={dRightToLeft:0,dLeftToRight:1};c.TEdge=function(){this.Bot=new c.FPoint0;this.Curr=new c.FPoint0;this.Top=new c.FPoint0;this.Delta=new c.FPoint0;this.Dx=0;this.PolyTyp=c.PolyType.ptSubject;this.Side=c.EdgeSide.esLeft;this.OutIdx=this.WindCnt2=this.WindCnt=this.WindDelta=0;this.PrevInSEL=this.NextInSEL=this.PrevInAEL=this.NextInAEL=this.NextInLML=
    this.Prev=this.Next=null};c.IntersectNode=function(){this.Edge2=this.Edge1=null;this.Pt=new c.FPoint0};c.MyIntersectNodeSort=function(){};c.MyIntersectNodeSort.Compare=function(a,b){var d=b.Pt.Y-a.Pt.Y;return 0<d?1:0>d?-1:0};c.LocalMinima=function(){this.Y=0;this.Next=this.RightBound=this.LeftBound=null};c.Scanbeam=function(){this.Y=0;this.Next=null};c.Maxima=function(){this.X=0;this.Prev=this.Next=null};c.OutRec=function(){this.Idx=0;this.IsOpen=this.IsHole=!1;this.PolyNode=this.BottomPt=this.Pts=
    this.FirstLeft=null};c.OutPt=function(){this.Idx=0;this.Pt=new c.FPoint0;this.Prev=this.Next=null};c.Join=function(){this.OutPt2=this.OutPt1=null;this.OffPt=new c.FPoint0};c.ClipperBase=function(){this.m_CurrentLM=this.m_MinimaList=null;this.m_edges=[];this.PreserveCollinear=this.m_HasOpenPaths=!1;this.m_ActiveEdges=this.m_PolyOuts=this.m_Scanbeam=null};c.ClipperBase.horizontal=-3.4E38;c.ClipperBase.Skip=-2;c.ClipperBase.Unassigned=-1;c.ClipperBase.tolerance=1E-20;c.ClipperBase.maxValue=Math.sqrt(Number.MAX_VALUE);
    c.ClipperBase.minValue=Math.sqrt(Number.MIN_VALUE);c.ClipperBase.near_zero=function(a){return a>-c.ClipperBase.tolerance&&a<c.ClipperBase.tolerance};c.ClipperBase.IsHorizontal=function(a){return 0===a.Delta.Y};c.ClipperBase.prototype.PointIsVertex=function(a,b){var d=b;do{if(c.FPoint.op_Equality(d.Pt,a))return!0;d=d.Next}while(d!==b);return!1};c.ClipperBase.prototype.PointOnLineSegment=function(a,b,d){return a.X===b.X&&a.Y===b.Y||a.X===d.X&&a.Y===d.Y||a.X>b.X===a.X<d.X&&a.Y>b.Y===a.Y<d.Y&&(a.X-b.X)*
    (d.Y-b.Y)===(d.X-b.X)*(a.Y-b.Y)};c.ClipperBase.prototype.PointOnPolygon=function(a,b){for(var d=b;;){if(this.PointOnLineSegment(a,d.Pt,d.Next.Pt))return!0;d=d.Next;if(d===b)break}return!1};c.ClipperBase.prototype.SlopesEqual=c.ClipperBase.SlopesEqual=function(){var a=arguments,b=a.length;if(2===b)return b=a[0],a=a[1],b.Delta.Y*a.Delta.X===b.Delta.X*a.Delta.Y;if(3===b){b=a[0];var d=a[1];var c=a[2];return 0===(b.Y-d.Y)*(d.X-c.X)-(b.X-d.X)*(d.Y-c.Y)}b=a[0];d=a[1];c=a[2];a=a[3];return 0===(b.Y-d.Y)*(c.X-
    a.X)-(b.X-d.X)*(c.Y-a.Y)};c.ClipperBase.SlopesEqual3=function(a,b){return a.Delta.Y*b.Delta.X===a.Delta.X*b.Delta.Y};c.ClipperBase.SlopesEqual4=function(a,b,d){return 0===(a.Y-b.Y)*(b.X-d.X)-(a.X-b.X)*(b.Y-d.Y)};c.ClipperBase.SlopesEqual5=function(a,b,d,c){return 0===(a.Y-b.Y)*(d.X-c.X)-(a.X-b.X)*(d.Y-c.Y)};c.ClipperBase.prototype.Clear=function(){this.DisposeLocalMinimaList();for(var a=0,b=this.m_edges.length;a<b;++a){for(var d=0,e=this.m_edges[a].length;d<e;++d)this.m_edges[a][d]=null;c.Clear(this.m_edges[a])}c.Clear(this.m_edges);
    this.m_HasOpenPaths=!1};c.ClipperBase.prototype.DisposeLocalMinimaList=function(){for(;null!==this.m_MinimaList;){var a=this.m_MinimaList.Next;this.m_MinimaList=null;this.m_MinimaList=a}this.m_CurrentLM=null};c.ClipperBase.prototype.RangeTest=function(a){(a.X>c.ClipperBase.maxValue||a.X<-c.ClipperBase.maxValue||a.Y>c.ClipperBase.maxValue||a.Y<-c.ClipperBase.maxValue||0<a.X&&a.X<c.ClipperBase.minValue||0<a.Y&&a.Y<c.ClipperBase.minValue||0>a.X&&a.X>-c.ClipperBase.minValue||0>a.Y&&a.Y>-c.ClipperBase.minValue)&&
    c.Error("Coordinate outside allowed range in RangeTest().")};c.ClipperBase.prototype.InitEdge=function(a,b,d,e){a.Next=b;a.Prev=d;a.Curr.X=e.X;a.Curr.Y=e.Y;c.use_xyz&&(a.Curr.Z=e.Z);a.OutIdx=-1};c.ClipperBase.prototype.InitEdge2=function(a,b){a.Curr.Y>=a.Next.Curr.Y?(a.Bot.X=a.Curr.X,a.Bot.Y=a.Curr.Y,c.use_xyz&&(a.Bot.Z=a.Curr.Z),a.Top.X=a.Next.Curr.X,a.Top.Y=a.Next.Curr.Y,c.use_xyz&&(a.Top.Z=a.Next.Curr.Z)):(a.Top.X=a.Curr.X,a.Top.Y=a.Curr.Y,c.use_xyz&&(a.Top.Z=a.Curr.Z),a.Bot.X=a.Next.Curr.X,a.Bot.Y=
    a.Next.Curr.Y,c.use_xyz&&(a.Bot.Z=a.Next.Curr.Z));this.SetDx(a);a.PolyTyp=b};c.ClipperBase.prototype.FindNextLocMin=function(a){for(var b;;){for(;c.FPoint.op_Inequality(a.Bot,a.Prev.Bot)||c.FPoint.op_Equality(a.Curr,a.Top);)a=a.Next;if(a.Dx!==c.ClipperBase.horizontal&&a.Prev.Dx!==c.ClipperBase.horizontal)break;for(;a.Prev.Dx===c.ClipperBase.horizontal;)a=a.Prev;for(b=a;a.Dx===c.ClipperBase.horizontal;)a=a.Next;if(a.Top.Y!==a.Prev.Bot.Y){b.Prev.Bot.X<a.Bot.X&&(a=b);break}}return a};c.ClipperBase.prototype.ProcessBound=
    function(a,b){var d=a,e;if(d.OutIdx===c.ClipperBase.Skip){a=d;if(b){for(;a.Top.Y===a.Next.Bot.Y;)a=a.Next;for(;a!==d&&a.Dx===c.ClipperBase.horizontal;)a=a.Prev}else{for(;a.Top.Y===a.Prev.Bot.Y;)a=a.Prev;for(;a!==d&&a.Dx===c.ClipperBase.horizontal;)a=a.Next}if(a===d)d=b?a.Next:a.Prev;else{a=b?d.Next:d.Prev;var f=new c.LocalMinima;f.Next=null;f.Y=a.Bot.Y;f.LeftBound=null;f.RightBound=a;a.WindDelta=0;d=this.ProcessBound(a,b);this.InsertLocalMinima(f)}return d}a.Dx===c.ClipperBase.horizontal&&(f=b?a.Prev:
    a.Next,f.Dx===c.ClipperBase.horizontal?f.Bot.X!==a.Bot.X&&f.Top.X!==a.Bot.X&&this.ReverseHorizontal(a):f.Bot.X!==a.Bot.X&&this.ReverseHorizontal(a));f=a;if(b){for(;d.Top.Y===d.Next.Bot.Y&&d.Next.OutIdx!==c.ClipperBase.Skip;)d=d.Next;if(d.Dx===c.ClipperBase.horizontal&&d.Next.OutIdx!==c.ClipperBase.Skip){for(e=d;e.Prev.Dx===c.ClipperBase.horizontal;)e=e.Prev;e.Prev.Top.X>d.Next.Top.X&&(d=e.Prev)}for(;a!==d;)a.NextInLML=a.Next,a.Dx===c.ClipperBase.horizontal&&a!==f&&a.Bot.X!==a.Prev.Top.X&&this.ReverseHorizontal(a),
    a=a.Next;a.Dx===c.ClipperBase.horizontal&&a!==f&&a.Bot.X!==a.Prev.Top.X&&this.ReverseHorizontal(a);d=d.Next}else{for(;d.Top.Y===d.Prev.Bot.Y&&d.Prev.OutIdx!==c.ClipperBase.Skip;)d=d.Prev;if(d.Dx===c.ClipperBase.horizontal&&d.Prev.OutIdx!==c.ClipperBase.Skip){for(e=d;e.Next.Dx===c.ClipperBase.horizontal;)e=e.Next;if(e.Next.Top.X===d.Prev.Top.X||e.Next.Top.X>d.Prev.Top.X)d=e.Next}for(;a!==d;)a.NextInLML=a.Prev,a.Dx===c.ClipperBase.horizontal&&a!==f&&a.Bot.X!==a.Next.Top.X&&this.ReverseHorizontal(a),
    a=a.Prev;a.Dx===c.ClipperBase.horizontal&&a!==f&&a.Bot.X!==a.Next.Top.X&&this.ReverseHorizontal(a);d=d.Prev}return d};c.ClipperBase.prototype.AddPath=function(a,b,d){c.use_lines?d||b!==c.PolyType.ptClip||c.Error("AddPath: Open paths must be subject."):d||c.Error("AddPath: Open paths have been disabled.");var e=a.length-1;if(d)for(;0<e&&c.FPoint.op_Equality(a[e],a[0]);)--e;for(;0<e&&c.FPoint.op_Equality(a[e],a[e-1]);)--e;if(d&&2>e||!d&&1>e)return!1;for(var f=[],g=0;g<=e;g++)f.push(new c.TEdge);var h=
    !0;f[1].Curr.X=a[1].X;f[1].Curr.Y=a[1].Y;c.use_xyz&&(f[1].Curr.Z=a[1].Z);this.RangeTest(a[0]);this.RangeTest(a[e]);this.InitEdge(f[0],f[1],f[e],a[0]);this.InitEdge(f[e],f[0],f[e-1],a[e]);for(g=e-1;1<=g;--g)this.RangeTest(a[g]),this.InitEdge(f[g],f[g+1],f[g-1],a[g]);for(g=a=e=f[0];;)if(a.Curr!==a.Next.Curr||!d&&a.Next===e){if(a.Prev===a.Next)break;else if(d&&c.ClipperBase.SlopesEqual4(a.Prev.Curr,a.Curr,a.Next.Curr)&&(!this.PreserveCollinear||!this.Pt2IsBetweenPt1AndPt3(a.Prev.Curr,a.Curr,a.Next.Curr))){a===
    e&&(e=a.Next);a=this.RemoveEdge(a);g=a=a.Prev;continue}a=a.Next;if(a===g||!d&&a.Next===e)break}else{if(a===a.Next)break;a===e&&(e=a.Next);g=a=this.RemoveEdge(a)}if(!d&&a===a.Next||d&&a.Prev===a.Next)return!1;d||(this.m_HasOpenPaths=!0,e.Prev.OutIdx=c.ClipperBase.Skip);a=e;do this.InitEdge2(a,b),a=a.Next,h&&a.Curr.Y!==e.Curr.Y&&(h=!1);while(a!==e);if(h){if(d)return!1;a.Prev.OutIdx=c.ClipperBase.Skip;b=new c.LocalMinima;b.Next=null;b.Y=a.Bot.Y;b.LeftBound=null;b.RightBound=a;b.RightBound.Side=c.EdgeSide.esRight;
    for(b.RightBound.WindDelta=0;;){a.Bot.X!==a.Prev.Top.X&&this.ReverseHorizontal(a);if(a.Next.OutIdx===c.ClipperBase.Skip)break;a=a.NextInLML=a.Next}this.InsertLocalMinima(b);this.m_edges.push(f);return!0}this.m_edges.push(f);h=null;c.FPoint.op_Equality(a.Prev.Bot,a.Prev.Top)&&(a=a.Next);for(;;){a=this.FindNextLocMin(a);if(a===h)break;else null===h&&(h=a);b=new c.LocalMinima;b.Next=null;b.Y=a.Bot.Y;a.Dx<a.Prev.Dx?(b.LeftBound=a.Prev,b.RightBound=a,f=!1):(b.LeftBound=a,b.RightBound=a.Prev,f=!0);b.LeftBound.Side=
    c.EdgeSide.esLeft;b.RightBound.Side=c.EdgeSide.esRight;b.LeftBound.WindDelta=d?b.LeftBound.Next===b.RightBound?-1:1:0;b.RightBound.WindDelta=-b.LeftBound.WindDelta;a=this.ProcessBound(b.LeftBound,f);a.OutIdx===c.ClipperBase.Skip&&(a=this.ProcessBound(a,f));e=this.ProcessBound(b.RightBound,!f);e.OutIdx===c.ClipperBase.Skip&&(e=this.ProcessBound(e,!f));b.LeftBound.OutIdx===c.ClipperBase.Skip?b.LeftBound=null:b.RightBound.OutIdx===c.ClipperBase.Skip&&(b.RightBound=null);this.InsertLocalMinima(b);f||
    (a=e)}return!0};c.ClipperBase.prototype.AddPaths=function(a,b,d){for(var c=!1,f=0,g=a.length;f<g;++f)this.AddPath(a[f],b,d)&&(c=!0);return c};c.ClipperBase.prototype.Pt2IsBetweenPt1AndPt3=function(a,b,d){return c.FPoint.op_Equality(a,d)||c.FPoint.op_Equality(a,b)||c.FPoint.op_Equality(d,b)?!1:a.X!==d.X?b.X>a.X===b.X<d.X:b.Y>a.Y===b.Y<d.Y};c.ClipperBase.prototype.RemoveEdge=function(a){a.Prev.Next=a.Next;a.Next.Prev=a.Prev;var b=a.Next;a.Prev=null;return b};c.ClipperBase.prototype.SetDx=function(a){a.Delta.X=
    a.Top.X-a.Bot.X;a.Delta.Y=a.Top.Y-a.Bot.Y;a.Dx=0===a.Delta.Y?c.ClipperBase.horizontal:a.Delta.X/a.Delta.Y};c.ClipperBase.prototype.InsertLocalMinima=function(a){if(null===this.m_MinimaList)this.m_MinimaList=a;else if(a.Y>=this.m_MinimaList.Y)a.Next=this.m_MinimaList,this.m_MinimaList=a;else{for(var b=this.m_MinimaList;null!==b.Next&&a.Y<b.Next.Y;)b=b.Next;a.Next=b.Next;b.Next=a}};c.ClipperBase.prototype.PopLocalMinima=function(a,b){b.v=this.m_CurrentLM;return null!==this.m_CurrentLM&&this.m_CurrentLM.Y===
    a?(this.m_CurrentLM=this.m_CurrentLM.Next,!0):!1};c.ClipperBase.prototype.ReverseHorizontal=function(a){var b=a.Top.X;a.Top.X=a.Bot.X;a.Bot.X=b;c.use_xyz&&(b=a.Top.Z,a.Top.Z=a.Bot.Z,a.Bot.Z=b)};c.ClipperBase.prototype.Reset=function(){this.m_CurrentLM=this.m_MinimaList;if(null!==this.m_CurrentLM){this.m_Scanbeam=null;for(var a=this.m_MinimaList;null!==a;){this.InsertScanbeam(a.Y);var b=a.LeftBound;null!==b&&(b.Curr.X=b.Bot.X,b.Curr.Y=b.Bot.Y,c.use_xyz&&(b.Curr.Z=b.Bot.Z),b.OutIdx=c.ClipperBase.Unassigned);
    b=a.RightBound;null!==b&&(b.Curr.X=b.Bot.X,b.Curr.Y=b.Bot.Y,c.use_xyz&&(b.Curr.Z=b.Bot.Z),b.OutIdx=c.ClipperBase.Unassigned);a=a.Next}this.m_ActiveEdges=null}};c.ClipperBase.prototype.InsertScanbeam=function(a){if(null===this.m_Scanbeam)this.m_Scanbeam=new c.Scanbeam,this.m_Scanbeam.Next=null,this.m_Scanbeam.Y=a;else if(a>this.m_Scanbeam.Y){var b=new c.Scanbeam;b.Y=a;b.Next=this.m_Scanbeam;this.m_Scanbeam=b}else{for(b=this.m_Scanbeam;null!==b.Next&&a<=b.Next.Y;)b=b.Next;if(a!==b.Y){var d=new c.Scanbeam;
    d.Y=a;d.Next=b.Next;b.Next=d}}};c.ClipperBase.prototype.PopScanbeam=function(a){if(null===this.m_Scanbeam)return a.v=0,!1;a.v=this.m_Scanbeam.Y;this.m_Scanbeam=this.m_Scanbeam.Next;return!0};c.ClipperBase.prototype.LocalMinimaPending=function(){return null!==this.m_CurrentLM};c.ClipperBase.prototype.CreateOutRec=function(){var a=new c.OutRec;a.Idx=c.ClipperBase.Unassigned;a.IsHole=!1;a.IsOpen=!1;a.FirstLeft=null;a.Pts=null;a.BottomPt=null;a.PolyNode=null;this.m_PolyOuts.push(a);a.Idx=this.m_PolyOuts.length-
    1;return a};c.ClipperBase.prototype.DisposeOutRec=function(a){this.m_PolyOuts[a].Pts=null;this.m_PolyOuts[a]=null};c.ClipperBase.prototype.UpdateEdgeIntoAEL=function(a){null===a.NextInLML&&c.Error("UpdateEdgeIntoAEL: invalid call");var b=a.PrevInAEL,d=a.NextInAEL;a.NextInLML.OutIdx=a.OutIdx;null!==b?b.NextInAEL=a.NextInLML:this.m_ActiveEdges=a.NextInLML;null!==d&&(d.PrevInAEL=a.NextInLML);a.NextInLML.Side=a.Side;a.NextInLML.WindDelta=a.WindDelta;a.NextInLML.WindCnt=a.WindCnt;a.NextInLML.WindCnt2=
    a.WindCnt2;a=a.NextInLML;a.Curr.X=a.Bot.X;a.Curr.Y=a.Bot.Y;a.PrevInAEL=b;a.NextInAEL=d;c.ClipperBase.IsHorizontal(a)||this.InsertScanbeam(a.Top.Y);return a};c.ClipperBase.prototype.SwapPositionsInAEL=function(a,b){if(a.NextInAEL!==a.PrevInAEL&&b.NextInAEL!==b.PrevInAEL){if(a.NextInAEL===b){var d=b.NextInAEL;null!==d&&(d.PrevInAEL=a);var c=a.PrevInAEL;null!==c&&(c.NextInAEL=b);b.PrevInAEL=c;b.NextInAEL=a;a.PrevInAEL=b;a.NextInAEL=d}else b.NextInAEL===a?(d=a.NextInAEL,null!==d&&(d.PrevInAEL=b),c=b.PrevInAEL,
    null!==c&&(c.NextInAEL=a),a.PrevInAEL=c,a.NextInAEL=b,b.PrevInAEL=a,b.NextInAEL=d):(d=a.NextInAEL,c=a.PrevInAEL,a.NextInAEL=b.NextInAEL,null!==a.NextInAEL&&(a.NextInAEL.PrevInAEL=a),a.PrevInAEL=b.PrevInAEL,null!==a.PrevInAEL&&(a.PrevInAEL.NextInAEL=a),b.NextInAEL=d,null!==b.NextInAEL&&(b.NextInAEL.PrevInAEL=b),b.PrevInAEL=c,null!==b.PrevInAEL&&(b.PrevInAEL.NextInAEL=b));null===a.PrevInAEL?this.m_ActiveEdges=a:null===b.PrevInAEL&&(this.m_ActiveEdges=b)}};c.ClipperBase.prototype.DeleteFromAEL=function(a){var b=
    a.PrevInAEL,d=a.NextInAEL;if(null!==b||null!==d||a===this.m_ActiveEdges)null!==b?b.NextInAEL=d:this.m_ActiveEdges=d,null!==d&&(d.PrevInAEL=b),a.NextInAEL=null,a.PrevInAEL=null};c.Clipper=function(a){"undefined"===typeof a&&(a=0);this.m_PolyOuts=null;this.m_ClipType=c.ClipType.ctIntersection;this.m_IntersectNodeComparer=this.m_IntersectList=this.m_SortedEdges=this.m_ActiveEdges=this.m_Maxima=this.m_Scanbeam=null;this.m_ExecuteLocked=!1;this.m_SubjFillType=this.m_ClipFillType=c.PolyFillType.pftEvenOdd;
    this.m_GhostJoins=this.m_Joins=null;this.StrictlySimple=this.ReverseSolution=this.m_UsingPolyTree=!1;c.ClipperBase.call(this);this.m_SortedEdges=this.m_ActiveEdges=this.m_Maxima=this.m_Scanbeam=null;this.m_IntersectList=[];this.m_IntersectNodeComparer=c.MyIntersectNodeSort.Compare;this.m_UsingPolyTree=this.m_ExecuteLocked=!1;this.m_PolyOuts=[];this.m_Joins=[];this.m_GhostJoins=[];this.ReverseSolution=0!==(1&a);this.StrictlySimple=0!==(2&a);this.PreserveCollinear=0!==(4&a);c.use_xyz&&(this.ZFillFunction=
    null)};c.Clipper.ioReverseSolution=1;c.Clipper.ioStrictlySimple=2;c.Clipper.ioPreserveCollinear=4;c.Clipper.prototype.Clear=function(){0!==this.m_edges.length&&(this.DisposeAllPolyPts(),c.ClipperBase.prototype.Clear.call(this))};c.Clipper.prototype.InsertMaxima=function(a){var b=new c.Maxima;b.X=a;if(null===this.m_Maxima)this.m_Maxima=b,this.m_Maxima.Next=null,this.m_Maxima.Prev=null;else if(a<this.m_Maxima.X)b.Next=this.m_Maxima,b.Prev=null,this.m_Maxima=b;else{for(var d=this.m_Maxima;null!==d.Next&&
    a>=d.Next.X;)d=d.Next;a!==d.X&&(b.Next=d.Next,b.Prev=d,null!==d.Next&&(d.Next.Prev=b),d.Next=b)}};c.Clipper.prototype.Execute=function(){var a;var b=arguments;var d=b.length;var e=b[1]instanceof c.PolyTree;if(4!==d||e){if(4===d&&e){d=b[0];var f=b[1];e=b[2];b=b[3];if(this.m_ExecuteLocked)return!1;this.m_ExecuteLocked=!0;this.m_SubjFillType=e;this.m_ClipFillType=b;this.m_ClipType=d;this.m_UsingPolyTree=!0;try{(a=this.ExecuteInternal())&&this.BuildResult2(f)}finally{this.DisposeAllPolyPts(),this.m_ExecuteLocked=
    !1}return a}if(2===d&&!e||2===d&&e)return d=b[0],f=b[1],this.Execute(d,f,c.PolyFillType.pftEvenOdd,c.PolyFillType.pftEvenOdd)}else{d=b[0];f=b[1];e=b[2];b=b[3];if(this.m_ExecuteLocked)return!1;this.m_HasOpenPaths&&c.Error("Error: PolyTree struct is needed for open path clipping.");this.m_ExecuteLocked=!0;c.Clear(f);this.m_SubjFillType=e;this.m_ClipFillType=b;this.m_ClipType=d;this.m_UsingPolyTree=!1;try{(a=this.ExecuteInternal())&&this.BuildResult(f)}finally{this.DisposeAllPolyPts(),this.m_ExecuteLocked=
    !1}return a}};c.Clipper.prototype.FixHoleLinkage=function(a){if(null!==a.FirstLeft&&(a.IsHole===a.FirstLeft.IsHole||null===a.FirstLeft.Pts)){for(var b=a.FirstLeft;null!==b&&(b.IsHole===a.IsHole||null===b.Pts);)b=b.FirstLeft;a.FirstLeft=b}};c.Clipper.prototype.ExecuteInternal=function(){try{this.Reset();this.m_Maxima=this.m_SortedEdges=null;var a={},b={};if(!this.PopScanbeam(a))return!1;for(this.InsertLocalMinimaIntoAEL(a.v);this.PopScanbeam(b)||this.LocalMinimaPending();){this.ProcessHorizontals();
    this.m_GhostJoins.length=0;if(!this.ProcessIntersections(b.v))return!1;this.ProcessEdgesAtTopOfScanbeam(b.v);a.v=b.v;this.InsertLocalMinimaIntoAEL(a.v)}var d;var c=0;for(d=this.m_PolyOuts.length;c<d;c++){var f=this.m_PolyOuts[c];null===f.Pts||f.IsOpen||(f.IsHole^this.ReverseSolution)==0<this.Area$1(f)&&this.ReversePolyPtLinks(f.Pts)}this.JoinCommonEdges();c=0;for(d=this.m_PolyOuts.length;c<d;c++)f=this.m_PolyOuts[c],null!==f.Pts&&(f.IsOpen?this.FixupOutPolyline(f):this.FixupOutPolygon(f));this.StrictlySimple&&
    this.DoSimplePolygons();return!0}finally{this.m_Joins.length=0,this.m_GhostJoins.length=0}};c.Clipper.prototype.DisposeAllPolyPts=function(){for(var a=0,b=this.m_PolyOuts.length;a<b;++a)this.DisposeOutRec(a);c.Clear(this.m_PolyOuts)};c.Clipper.prototype.AddJoin=function(a,b,d){var e=new c.Join;e.OutPt1=a;e.OutPt2=b;e.OffPt.X=d.X;e.OffPt.Y=d.Y;c.use_xyz&&(e.OffPt.Z=d.Z);this.m_Joins.push(e)};c.Clipper.prototype.AddGhostJoin=function(a,b){var d=new c.Join;d.OutPt1=a;d.OffPt.X=b.X;d.OffPt.Y=b.Y;c.use_xyz&&
    (d.OffPt.Z=b.Z);this.m_GhostJoins.push(d)};c.Clipper.prototype.SetZ=function(a,b,d){null!==this.ZFillFunction&&0===a.Z&&null!==this.ZFillFunction&&(c.FPoint.op_Equality(a,b.Bot)?a.Z=b.Bot.Z:c.FPoint.op_Equality(a,b.Top)?a.Z=b.Top.Z:c.FPoint.op_Equality(a,d.Bot)?a.Z=d.Bot.Z:c.FPoint.op_Equality(a,d.Top)?a.Z=d.Top.Z:this.ZFillFunction(b.Bot,b.Top,d.Bot,d.Top,a))};c.Clipper.prototype.InsertLocalMinimaIntoAEL=function(a){for(var b,d={},e,f;this.PopLocalMinima(a,d);){e=d.v.LeftBound;f=d.v.RightBound;var g=
    null;null===e?(this.InsertEdgeIntoAEL(f,null),this.SetWindingCount(f),this.IsContributing(f)&&(g=this.AddOutPt(f,f.Bot))):(null===f?(this.InsertEdgeIntoAEL(e,null),this.SetWindingCount(e),this.IsContributing(e)&&(g=this.AddOutPt(e,e.Bot))):(this.InsertEdgeIntoAEL(e,null),this.InsertEdgeIntoAEL(f,e),this.SetWindingCount(e),f.WindCnt=e.WindCnt,f.WindCnt2=e.WindCnt2,this.IsContributing(e)&&(g=this.AddLocalMinPoly(e,f,e.Bot))),this.InsertScanbeam(e.Top.Y));null!==f&&(c.ClipperBase.IsHorizontal(f)?(null!==
    f.NextInLML&&this.InsertScanbeam(f.NextInLML.Top.Y),this.AddEdgeToSEL(f)):this.InsertScanbeam(f.Top.Y));if(null!==e&&null!==f){if(null!==g&&c.ClipperBase.IsHorizontal(f)&&0<this.m_GhostJoins.length&&0!==f.WindDelta){b=0;for(var h=this.m_GhostJoins.length;b<h;b++){var l=this.m_GhostJoins[b];this.HorzSegmentsOverlap(l.OutPt1.Pt.X,l.OffPt.X,f.Bot.X,f.Top.X)&&this.AddJoin(l.OutPt1,g,l.OffPt)}}0<=e.OutIdx&&null!==e.PrevInAEL&&e.PrevInAEL.Curr.X===e.Bot.X&&0<=e.PrevInAEL.OutIdx&&c.ClipperBase.SlopesEqual5(e.PrevInAEL.Curr,
    e.PrevInAEL.Top,e.Curr,e.Top)&&0!==e.WindDelta&&0!==e.PrevInAEL.WindDelta&&(b=this.AddOutPt(e.PrevInAEL,e.Bot),this.AddJoin(g,b,e.Top));if(e.NextInAEL!==f&&(0<=f.OutIdx&&0<=f.PrevInAEL.OutIdx&&c.ClipperBase.SlopesEqual5(f.PrevInAEL.Curr,f.PrevInAEL.Top,f.Curr,f.Top)&&0!==f.WindDelta&&0!==f.PrevInAEL.WindDelta&&(b=this.AddOutPt(f.PrevInAEL,f.Bot),this.AddJoin(g,b,f.Top)),g=e.NextInAEL,null!==g))for(;g!==f;)this.IntersectEdges(f,g,e.Curr),g=g.NextInAEL}}};c.Clipper.prototype.InsertEdgeIntoAEL=function(a,
    b){if(null===this.m_ActiveEdges)a.PrevInAEL=null,a.NextInAEL=null,this.m_ActiveEdges=a;else if(null===b&&this.E2InsertsBeforeE1(this.m_ActiveEdges,a))a.PrevInAEL=null,a.NextInAEL=this.m_ActiveEdges,this.m_ActiveEdges=this.m_ActiveEdges.PrevInAEL=a;else{null===b&&(b=this.m_ActiveEdges);for(;null!==b.NextInAEL&&!this.E2InsertsBeforeE1(b.NextInAEL,a);)b=b.NextInAEL;a.NextInAEL=b.NextInAEL;null!==b.NextInAEL&&(b.NextInAEL.PrevInAEL=a);a.PrevInAEL=b;b.NextInAEL=a}};c.Clipper.prototype.E2InsertsBeforeE1=
    function(a,b){return b.Curr.X===a.Curr.X?b.Top.Y>a.Top.Y?b.Top.X<c.Clipper.TopX(a,b.Top.Y):a.Top.X>c.Clipper.TopX(b,a.Top.Y):b.Curr.X<a.Curr.X};c.Clipper.prototype.IsEvenOddFillType=function(a){return a.PolyTyp===c.PolyType.ptSubject?this.m_SubjFillType===c.PolyFillType.pftEvenOdd:this.m_ClipFillType===c.PolyFillType.pftEvenOdd};c.Clipper.prototype.IsEvenOddAltFillType=function(a){return a.PolyTyp===c.PolyType.ptSubject?this.m_ClipFillType===c.PolyFillType.pftEvenOdd:this.m_SubjFillType===c.PolyFillType.pftEvenOdd};
    c.Clipper.prototype.IsContributing=function(a){if(a.PolyTyp===c.PolyType.ptSubject){var b=this.m_SubjFillType;var d=this.m_ClipFillType}else b=this.m_ClipFillType,d=this.m_SubjFillType;switch(b){case c.PolyFillType.pftEvenOdd:if(0===a.WindDelta&&1!==a.WindCnt)return!1;break;case c.PolyFillType.pftNonZero:if(1!==Math.abs(a.WindCnt))return!1;break;case c.PolyFillType.pftPositive:if(1!==a.WindCnt)return!1;break;default:if(-1!==a.WindCnt)return!1}switch(this.m_ClipType){case c.ClipType.ctIntersection:switch(d){case c.PolyFillType.pftEvenOdd:case c.PolyFillType.pftNonZero:return 0!==
    a.WindCnt2;case c.PolyFillType.pftPositive:return 0<a.WindCnt2;default:return 0>a.WindCnt2}case c.ClipType.ctUnion:switch(d){case c.PolyFillType.pftEvenOdd:case c.PolyFillType.pftNonZero:return 0===a.WindCnt2;case c.PolyFillType.pftPositive:return 0>=a.WindCnt2;default:return 0<=a.WindCnt2}case c.ClipType.ctDifference:if(a.PolyTyp===c.PolyType.ptSubject)switch(d){case c.PolyFillType.pftEvenOdd:case c.PolyFillType.pftNonZero:return 0===a.WindCnt2;case c.PolyFillType.pftPositive:return 0>=a.WindCnt2;
    default:return 0<=a.WindCnt2}else switch(d){case c.PolyFillType.pftEvenOdd:case c.PolyFillType.pftNonZero:return 0!==a.WindCnt2;case c.PolyFillType.pftPositive:return 0<a.WindCnt2;default:return 0>a.WindCnt2}case c.ClipType.ctXor:if(0===a.WindDelta)switch(d){case c.PolyFillType.pftEvenOdd:case c.PolyFillType.pftNonZero:return 0===a.WindCnt2;case c.PolyFillType.pftPositive:return 0>=a.WindCnt2;default:return 0<=a.WindCnt2}}return!0};c.Clipper.prototype.SetWindingCount=function(a){for(var b=a.PrevInAEL;null!==
    b&&(b.PolyTyp!==a.PolyTyp||0===b.WindDelta);)b=b.PrevInAEL;if(null===b)b=a.PolyTyp===c.PolyType.ptSubject?this.m_SubjFillType:this.m_ClipFillType,a.WindCnt=0===a.WindDelta?b===c.PolyFillType.pftNegative?-1:1:a.WindDelta,a.WindCnt2=0,b=this.m_ActiveEdges;else{if(0===a.WindDelta&&this.m_ClipType!==c.ClipType.ctUnion)a.WindCnt=1;else if(this.IsEvenOddFillType(a))if(0===a.WindDelta){for(var d=!0,e=b.PrevInAEL;null!==e;)e.PolyTyp===b.PolyTyp&&0!==e.WindDelta&&(d=!d),e=e.PrevInAEL;a.WindCnt=d?0:1}else a.WindCnt=
    a.WindDelta;else a.WindCnt=0>b.WindCnt*b.WindDelta?1<Math.abs(b.WindCnt)?0>b.WindDelta*a.WindDelta?b.WindCnt:b.WindCnt+a.WindDelta:0===a.WindDelta?1:a.WindDelta:0===a.WindDelta?0>b.WindCnt?b.WindCnt-1:b.WindCnt+1:0>b.WindDelta*a.WindDelta?b.WindCnt:b.WindCnt+a.WindDelta;a.WindCnt2=b.WindCnt2;b=b.NextInAEL}if(this.IsEvenOddAltFillType(a))for(;b!==a;)0!==b.WindDelta&&(a.WindCnt2=0===a.WindCnt2?1:0),b=b.NextInAEL;else for(;b!==a;)a.WindCnt2+=b.WindDelta,b=b.NextInAEL};c.Clipper.prototype.AddEdgeToSEL=
    function(a){null===this.m_SortedEdges?(this.m_SortedEdges=a,a.PrevInSEL=null,a.NextInSEL=null):(a.NextInSEL=this.m_SortedEdges,a.PrevInSEL=null,this.m_SortedEdges=this.m_SortedEdges.PrevInSEL=a)};c.Clipper.prototype.PopEdgeFromSEL=function(a){a.v=this.m_SortedEdges;if(null===a.v)return!1;var b=a.v;this.m_SortedEdges=a.v.NextInSEL;null!==this.m_SortedEdges&&(this.m_SortedEdges.PrevInSEL=null);b.NextInSEL=null;b.PrevInSEL=null;return!0};c.Clipper.prototype.CopyAELToSEL=function(){var a=this.m_ActiveEdges;
    for(this.m_SortedEdges=a;null!==a;)a.PrevInSEL=a.PrevInAEL,a=a.NextInSEL=a.NextInAEL};c.Clipper.prototype.SwapPositionsInSEL=function(a,b){if(null!==a.NextInSEL||null!==a.PrevInSEL)if(null!==b.NextInSEL||null!==b.PrevInSEL){if(a.NextInSEL===b){var d=b.NextInSEL;null!==d&&(d.PrevInSEL=a);var c=a.PrevInSEL;null!==c&&(c.NextInSEL=b);b.PrevInSEL=c;b.NextInSEL=a;a.PrevInSEL=b;a.NextInSEL=d}else b.NextInSEL===a?(d=a.NextInSEL,null!==d&&(d.PrevInSEL=b),c=b.PrevInSEL,null!==c&&(c.NextInSEL=a),a.PrevInSEL=
    c,a.NextInSEL=b,b.PrevInSEL=a,b.NextInSEL=d):(d=a.NextInSEL,c=a.PrevInSEL,a.NextInSEL=b.NextInSEL,null!==a.NextInSEL&&(a.NextInSEL.PrevInSEL=a),a.PrevInSEL=b.PrevInSEL,null!==a.PrevInSEL&&(a.PrevInSEL.NextInSEL=a),b.NextInSEL=d,null!==b.NextInSEL&&(b.NextInSEL.PrevInSEL=b),b.PrevInSEL=c,null!==b.PrevInSEL&&(b.PrevInSEL.NextInSEL=b));null===a.PrevInSEL?this.m_SortedEdges=a:null===b.PrevInSEL&&(this.m_SortedEdges=b)}};c.Clipper.prototype.AddLocalMaxPoly=function(a,b,d){this.AddOutPt(a,d);0===b.WindDelta&&
    this.AddOutPt(b,d);a.OutIdx===b.OutIdx?(a.OutIdx=-1,b.OutIdx=-1):a.OutIdx<b.OutIdx?this.AppendPolygon(a,b):this.AppendPolygon(b,a)};c.Clipper.prototype.AddLocalMinPoly=function(a,b,d){if(c.ClipperBase.IsHorizontal(b)||a.Dx>b.Dx){var e=this.AddOutPt(a,d);b.OutIdx=a.OutIdx;a.Side=c.EdgeSide.esLeft;b.Side=c.EdgeSide.esRight;var f=a;a=f.PrevInAEL===b?b.PrevInAEL:f.PrevInAEL}else e=this.AddOutPt(b,d),a.OutIdx=b.OutIdx,a.Side=c.EdgeSide.esRight,b.Side=c.EdgeSide.esLeft,f=b,a=f.PrevInAEL===a?a.PrevInAEL:
    f.PrevInAEL;if(null!==a&&0<=a.OutIdx&&a.Top.Y<d.Y&&f.Top.Y<d.Y){b=c.Clipper.TopX(a,d.Y);var g=c.Clipper.TopX(f,d.Y);b===g&&0!==f.WindDelta&&0!==a.WindDelta&&c.ClipperBase.SlopesEqual5(new c.FPoint2(b,d.Y),a.Top,new c.FPoint2(g,d.Y),f.Top)&&(d=this.AddOutPt(a,d),this.AddJoin(e,d,f.Top))}return e};c.Clipper.prototype.AddOutPt=function(a,b){if(0>a.OutIdx){var d=this.CreateOutRec();d.IsOpen=0===a.WindDelta;var e=new c.OutPt;d.Pts=e;e.Idx=d.Idx;e.Pt.X=b.X;e.Pt.Y=b.Y;c.use_xyz&&(e.Pt.Z=b.Z);e.Next=e;e.Prev=
    e;d.IsOpen||this.SetHoleState(a,d);a.OutIdx=d.Idx}else{d=this.m_PolyOuts[a.OutIdx];var f=d.Pts,g=a.Side===c.EdgeSide.esLeft;if(g&&c.FPoint.op_Equality(b,f.Pt))return f;if(!g&&c.FPoint.op_Equality(b,f.Prev.Pt))return f.Prev;e=new c.OutPt;e.Idx=d.Idx;e.Pt.X=b.X;e.Pt.Y=b.Y;c.use_xyz&&(e.Pt.Z=b.Z);e.Next=f;e.Prev=f.Prev;e.Prev.Next=e;f.Prev=e;g&&(d.Pts=e)}return e};c.Clipper.prototype.GetLastOutPt=function(a){var b=this.m_PolyOuts[a.OutIdx];return a.Side===c.EdgeSide.esLeft?b.Pts:b.Pts.Prev};c.Clipper.prototype.SwapPoints=
    function(a,b){var d=new c.FPoint1(a.Value);a.Value.X=b.Value.X;a.Value.Y=b.Value.Y;c.use_xyz&&(a.Value.Z=b.Value.Z);b.Value.X=d.X;b.Value.Y=d.Y;c.use_xyz&&(b.Value.Z=d.Z)};c.Clipper.prototype.HorzSegmentsOverlap=function(a,b,d,c){if(a>b){var e=a;a=b;b=e}d>c&&(e=d,d=c,c=e);return a<c&&d<b};c.Clipper.prototype.SetHoleState=function(a,b){for(var d=a.PrevInAEL,c=null;null!==d;)0<=d.OutIdx&&0!==d.WindDelta&&(null===c?c=d:c.OutIdx===d.OutIdx&&(c=null)),d=d.PrevInAEL;null===c?(b.FirstLeft=null,b.IsHole=
    !1):(b.FirstLeft=this.m_PolyOuts[c.OutIdx],b.IsHole=!b.FirstLeft.IsHole)};c.Clipper.prototype.GetDx=function(a,b){return a.Y===b.Y?c.ClipperBase.horizontal:(b.X-a.X)/(b.Y-a.Y)};c.Clipper.prototype.FirstIsBottomPt=function(a,b){for(var d=a.Prev;c.FPoint.op_Equality(d.Pt,a.Pt)&&d!==a;)d=d.Prev;var e=Math.abs(this.GetDx(a.Pt,d.Pt));for(d=a.Next;c.FPoint.op_Equality(d.Pt,a.Pt)&&d!==a;)d=d.Next;var f=Math.abs(this.GetDx(a.Pt,d.Pt));for(d=b.Prev;c.FPoint.op_Equality(d.Pt,b.Pt)&&d!==b;)d=d.Prev;var g=Math.abs(this.GetDx(b.Pt,
    d.Pt));for(d=b.Next;c.FPoint.op_Equality(d.Pt,b.Pt)&&d!==b;)d=d.Next;d=Math.abs(this.GetDx(b.Pt,d.Pt));return Math.max(e,f)===Math.max(g,d)&&Math.min(e,f)===Math.min(g,d)?0<this.Area(a):e>=g&&e>=d||f>=g&&f>=d};c.Clipper.prototype.GetBottomPt=function(a){for(var b=null,d=a.Next;d!==a;)d.Pt.Y>a.Pt.Y?(a=d,b=null):d.Pt.Y===a.Pt.Y&&d.Pt.X<=a.Pt.X&&(d.Pt.X<a.Pt.X?(b=null,a=d):d.Next!==a&&d.Prev!==a&&(b=d)),d=d.Next;if(null!==b)for(;b!==d;)for(this.FirstIsBottomPt(d,b)||(a=b),b=b.Next;c.FPoint.op_Inequality(b.Pt,
    a.Pt);)b=b.Next;return a};c.Clipper.prototype.GetLowermostRec=function(a,b){null===a.BottomPt&&(a.BottomPt=this.GetBottomPt(a.Pts));null===b.BottomPt&&(b.BottomPt=this.GetBottomPt(b.Pts));var d=a.BottomPt,c=b.BottomPt;return d.Pt.Y>c.Pt.Y?a:d.Pt.Y<c.Pt.Y?b:d.Pt.X<c.Pt.X?a:d.Pt.X>c.Pt.X?b:d.Next===d?b:c.Next===c?a:this.FirstIsBottomPt(d,c)?a:b};c.Clipper.prototype.OutRec1RightOfOutRec2=function(a,b){do if(a=a.FirstLeft,a===b)return!0;while(null!==a);return!1};c.Clipper.prototype.GetOutRec=function(a){for(a=
    this.m_PolyOuts[a];a!==this.m_PolyOuts[a.Idx];)a=this.m_PolyOuts[a.Idx];return a};c.Clipper.prototype.AppendPolygon=function(a,b){var d=this.m_PolyOuts[a.OutIdx],e=this.m_PolyOuts[b.OutIdx];var f=this.OutRec1RightOfOutRec2(d,e)?e:this.OutRec1RightOfOutRec2(e,d)?d:this.GetLowermostRec(d,e);var g=d.Pts,h=g.Prev,l=e.Pts,k=l.Prev;a.Side===c.EdgeSide.esLeft?b.Side===c.EdgeSide.esLeft?(this.ReversePolyPtLinks(l),l.Next=g,g.Prev=l,h.Next=k,k.Prev=h,d.Pts=k):(k.Next=g,g.Prev=k,l.Prev=h,h.Next=l,d.Pts=l):
    b.Side===c.EdgeSide.esRight?(this.ReversePolyPtLinks(l),h.Next=k,k.Prev=h,l.Next=g,g.Prev=l):(h.Next=l,l.Prev=h,g.Prev=k,k.Next=g);d.BottomPt=null;f===e&&(e.FirstLeft!==d&&(d.FirstLeft=e.FirstLeft),d.IsHole=e.IsHole);e.Pts=null;e.BottomPt=null;e.FirstLeft=d;f=a.OutIdx;g=b.OutIdx;a.OutIdx=-1;b.OutIdx=-1;for(h=this.m_ActiveEdges;null!==h;){if(h.OutIdx===g){h.OutIdx=f;h.Side=a.Side;break}h=h.NextInAEL}e.Idx=d.Idx};c.Clipper.prototype.ReversePolyPtLinks=function(a){if(null!==a){var b=a;do{var d=b.Next;
    b.Next=b.Prev;b=b.Prev=d}while(b!==a)}};c.Clipper.SwapSides=function(a,b){var d=a.Side;a.Side=b.Side;b.Side=d};c.Clipper.SwapPolyIndexes=function(a,b){var d=a.OutIdx;a.OutIdx=b.OutIdx;b.OutIdx=d};c.Clipper.prototype.IntersectEdges=function(a,b,d){var e=0<=a.OutIdx,f=0<=b.OutIdx;c.use_xyz&&this.SetZ(d,a,b);if(!c.use_lines||0!==a.WindDelta&&0!==b.WindDelta){if(a.PolyTyp===b.PolyTyp)if(this.IsEvenOddFillType(a)){var g=a.WindCnt;a.WindCnt=b.WindCnt;b.WindCnt=g}else a.WindCnt=0===a.WindCnt+b.WindDelta?
    -a.WindCnt:a.WindCnt+b.WindDelta,b.WindCnt=0===b.WindCnt-a.WindDelta?-b.WindCnt:b.WindCnt-a.WindDelta;else this.IsEvenOddFillType(b)?a.WindCnt2=0===a.WindCnt2?1:0:a.WindCnt2+=b.WindDelta,this.IsEvenOddFillType(a)?b.WindCnt2=0===b.WindCnt2?1:0:b.WindCnt2-=a.WindDelta;if(a.PolyTyp===c.PolyType.ptSubject){var h=this.m_SubjFillType;var l=this.m_ClipFillType}else h=this.m_ClipFillType,l=this.m_SubjFillType;if(b.PolyTyp===c.PolyType.ptSubject){var k=this.m_SubjFillType;g=this.m_ClipFillType}else k=this.m_ClipFillType,
    g=this.m_SubjFillType;switch(h){case c.PolyFillType.pftPositive:h=a.WindCnt;break;case c.PolyFillType.pftNegative:h=-a.WindCnt;break;default:h=Math.abs(a.WindCnt)}switch(k){case c.PolyFillType.pftPositive:k=b.WindCnt;break;case c.PolyFillType.pftNegative:k=-b.WindCnt;break;default:k=Math.abs(b.WindCnt)}if(e&&f)0!==h&&1!==h||0!==k&&1!==k||a.PolyTyp!==b.PolyTyp&&this.m_ClipType!==c.ClipType.ctXor?this.AddLocalMaxPoly(a,b,d):(this.AddOutPt(a,d),this.AddOutPt(b,d),c.Clipper.SwapSides(a,b),c.Clipper.SwapPolyIndexes(a,
    b));else if(e){if(0===k||1===k)this.AddOutPt(a,d),c.Clipper.SwapSides(a,b),c.Clipper.SwapPolyIndexes(a,b)}else if(f){if(0===h||1===h)this.AddOutPt(b,d),c.Clipper.SwapSides(a,b),c.Clipper.SwapPolyIndexes(a,b)}else if(!(0!==h&&1!==h||0!==k&&1!==k)){switch(l){case c.PolyFillType.pftPositive:e=a.WindCnt2;break;case c.PolyFillType.pftNegative:e=-a.WindCnt2;break;default:e=Math.abs(a.WindCnt2)}switch(g){case c.PolyFillType.pftPositive:f=b.WindCnt2;break;case c.PolyFillType.pftNegative:f=-b.WindCnt2;break;
    default:f=Math.abs(b.WindCnt2)}if(a.PolyTyp!==b.PolyTyp)this.AddLocalMinPoly(a,b,d);else if(1===h&&1===k)switch(this.m_ClipType){case c.ClipType.ctIntersection:0<e&&0<f&&this.AddLocalMinPoly(a,b,d);break;case c.ClipType.ctUnion:0>=e&&0>=f&&this.AddLocalMinPoly(a,b,d);break;case c.ClipType.ctDifference:(a.PolyTyp===c.PolyType.ptClip&&0<e&&0<f||a.PolyTyp===c.PolyType.ptSubject&&0>=e&&0>=f)&&this.AddLocalMinPoly(a,b,d);break;case c.ClipType.ctXor:this.AddLocalMinPoly(a,b,d)}else c.Clipper.SwapSides(a,
    b)}}else if(0!==a.WindDelta||0!==b.WindDelta)a.PolyTyp===b.PolyTyp&&a.WindDelta!==b.WindDelta&&this.m_ClipType===c.ClipType.ctUnion?0===a.WindDelta?f&&(this.AddOutPt(a,d),e&&(a.OutIdx=-1)):e&&(this.AddOutPt(b,d),f&&(b.OutIdx=-1)):a.PolyTyp!==b.PolyTyp&&(0!==a.WindDelta||1!==Math.abs(b.WindCnt)||this.m_ClipType===c.ClipType.ctUnion&&0!==b.WindCnt2?0!==b.WindDelta||1!==Math.abs(a.WindCnt)||this.m_ClipType===c.ClipType.ctUnion&&0!==a.WindCnt2||(this.AddOutPt(b,d),f&&(b.OutIdx=-1)):(this.AddOutPt(a,d),
    e&&(a.OutIdx=-1)))};c.Clipper.prototype.DeleteFromSEL=function(a){var b=a.PrevInSEL,d=a.NextInSEL;if(null!==b||null!==d||a===this.m_SortedEdges)null!==b?b.NextInSEL=d:this.m_SortedEdges=d,null!==d&&(d.PrevInSEL=b),a.NextInSEL=null,a.PrevInSEL=null};c.Clipper.prototype.ProcessHorizontals=function(){for(var a={};this.PopEdgeFromSEL(a);)this.ProcessHorizontal(a.v)};c.Clipper.prototype.GetHorzDirection=function(a,b){a.Bot.X<a.Top.X?(b.Left=a.Bot.X,b.Right=a.Top.X,b.Dir=c.Direction.dLeftToRight):(b.Left=
    a.Top.X,b.Right=a.Bot.X,b.Dir=c.Direction.dRightToLeft)};c.Clipper.prototype.ProcessHorizontal=function(a){var b,d={Dir:null,Left:null,Right:null};this.GetHorzDirection(a,d);var e=d.Dir,f=d.Left;d=d.Right;for(var g=0===a.WindDelta,h=a,l=null;null!==h.NextInLML&&c.ClipperBase.IsHorizontal(h.NextInLML);)h=h.NextInLML;null===h.NextInLML&&(l=this.GetMaximaPair(h));var k=this.m_Maxima;if(null!==k)if(e===c.Direction.dLeftToRight){for(;null!==k&&k.X<=a.Bot.X;)k=k.Next;null!==k&&k.X>=h.Top.X&&(k=null)}else{for(;null!==
    k.Next&&k.Next.X<a.Bot.X;)k=k.Next;k.X<=h.Top.X&&(k=null)}for(var m=null;;){for(var p=a===h,n=this.GetNextInAEL(a,e);null!==n;){if(null!==k)if(e===c.Direction.dLeftToRight)for(;null!==k&&k.X<n.Curr.X;)0<=a.OutIdx&&!g&&this.AddOutPt(a,new c.FPoint2(k.X,a.Bot.Y)),k=k.Next;else for(;null!==k&&k.X>n.Curr.X;)0<=a.OutIdx&&!g&&this.AddOutPt(a,new c.FPoint2(k.X,a.Bot.Y)),k=k.Prev;if(e===c.Direction.dLeftToRight&&n.Curr.X>d||e===c.Direction.dRightToLeft&&n.Curr.X<f)break;if(n.Curr.X===a.Top.X&&null!==a.NextInLML&&
    n.Dx<a.NextInLML.Dx)break;if(0<=a.OutIdx&&!g){c.use_xyz&&(e===c.Direction.dLeftToRight?this.SetZ(n.Curr,a,n):this.SetZ(n.Curr,n,a));m=this.AddOutPt(a,n.Curr);for(b=this.m_SortedEdges;null!==b;){if(0<=b.OutIdx&&this.HorzSegmentsOverlap(a.Bot.X,a.Top.X,b.Bot.X,b.Top.X)){var q=this.GetLastOutPt(b);this.AddJoin(q,m,b.Top)}b=b.NextInSEL}this.AddGhostJoin(m,a.Bot)}if(n===l&&p){0<=a.OutIdx&&this.AddLocalMaxPoly(a,l,a.Top);this.DeleteFromAEL(a);this.DeleteFromAEL(l);return}e===c.Direction.dLeftToRight?(q=
    new c.FPoint2(n.Curr.X,a.Curr.Y),this.IntersectEdges(a,n,q)):(q=new c.FPoint2(n.Curr.X,a.Curr.Y),this.IntersectEdges(n,a,q));q=this.GetNextInAEL(n,e);this.SwapPositionsInAEL(a,n);n=q}if(null===a.NextInLML||!c.ClipperBase.IsHorizontal(a.NextInLML))break;a=this.UpdateEdgeIntoAEL(a);0<=a.OutIdx&&this.AddOutPt(a,a.Bot);d={Dir:e,Left:f,Right:d};this.GetHorzDirection(a,d);e=d.Dir;f=d.Left;d=d.Right}if(0<=a.OutIdx&&null===m){m=this.GetLastOutPt(a);for(b=this.m_SortedEdges;null!==b;)0<=b.OutIdx&&this.HorzSegmentsOverlap(a.Bot.X,
    a.Top.X,b.Bot.X,b.Top.X)&&(q=this.GetLastOutPt(b),this.AddJoin(q,m,b.Top)),b=b.NextInSEL;this.AddGhostJoin(m,a.Top)}null!==a.NextInLML?0<=a.OutIdx?(m=this.AddOutPt(a,a.Top),a=this.UpdateEdgeIntoAEL(a),0!==a.WindDelta&&(e=a.PrevInAEL,q=a.NextInAEL,null!==e&&e.Curr.X===a.Bot.X&&e.Curr.Y===a.Bot.Y&&0===e.WindDelta&&0<=e.OutIdx&&e.Curr.Y>e.Top.Y&&c.ClipperBase.SlopesEqual3(a,e)?(q=this.AddOutPt(e,a.Bot),this.AddJoin(m,q,a.Top)):null!==q&&q.Curr.X===a.Bot.X&&q.Curr.Y===a.Bot.Y&&0!==q.WindDelta&&0<=q.OutIdx&&
    q.Curr.Y>q.Top.Y&&c.ClipperBase.SlopesEqual3(a,q)&&(q=this.AddOutPt(q,a.Bot),this.AddJoin(m,q,a.Top)))):this.UpdateEdgeIntoAEL(a):(0<=a.OutIdx&&this.AddOutPt(a,a.Top),this.DeleteFromAEL(a))};c.Clipper.prototype.GetNextInAEL=function(a,b){return b===c.Direction.dLeftToRight?a.NextInAEL:a.PrevInAEL};c.Clipper.prototype.IsMinima=function(a){return null!==a&&a.Prev.NextInLML!==a&&a.Next.NextInLML!==a};c.Clipper.prototype.IsMaxima=function(a,b){return null!==a&&a.Top.Y===b&&null===a.NextInLML};c.Clipper.prototype.IsIntermediate=
    function(a,b){return a.Top.Y===b&&null!==a.NextInLML};c.Clipper.prototype.GetMaximaPair=function(a){return c.FPoint.op_Equality(a.Next.Top,a.Top)&&null===a.Next.NextInLML?a.Next:c.FPoint.op_Equality(a.Prev.Top,a.Top)&&null===a.Prev.NextInLML?a.Prev:null};c.Clipper.prototype.GetMaximaPairEx=function(a){a=this.GetMaximaPair(a);return null===a||a.OutIdx===c.ClipperBase.Skip||a.NextInAEL===a.PrevInAEL&&!c.ClipperBase.IsHorizontal(a)?null:a};c.Clipper.prototype.ProcessIntersections=function(a){if(null===
    this.m_ActiveEdges)return!0;try{this.BuildIntersectList(a);if(0===this.m_IntersectList.length)return!0;if(1===this.m_IntersectList.length||this.FixupIntersectionOrder())this.ProcessIntersectList();else return!1}catch(b){this.m_SortedEdges=null,this.m_IntersectList.length=0,c.Error("ProcessIntersections error")}this.m_SortedEdges=null;return!0};c.Clipper.prototype.BuildIntersectList=function(a){if(null!==this.m_ActiveEdges){var b=this.m_ActiveEdges;for(this.m_SortedEdges=b;null!==b;)b.PrevInSEL=b.PrevInAEL,
    b.NextInSEL=b.NextInAEL,b.Curr.X=c.Clipper.TopX(b,a),b=b.NextInAEL;for(var d=!0;d&&null!==this.m_SortedEdges;){d=!1;for(b=this.m_SortedEdges;null!==b.NextInSEL;){var e=b.NextInSEL,f=new c.FPoint0;b.Curr.X>e.Curr.X?(this.IntersectPoint(b,e,f),f.Y<a&&(f=new c.FPoint2(c.Clipper.TopX(b,a),a)),d=new c.IntersectNode,d.Edge1=b,d.Edge2=e,d.Pt.X=f.X,d.Pt.Y=f.Y,c.use_xyz&&(d.Pt.Z=f.Z),this.m_IntersectList.push(d),this.SwapPositionsInSEL(b,e),d=!0):b=e}if(null!==b.PrevInSEL)b.PrevInSEL.NextInSEL=null;else break}this.m_SortedEdges=
    null}};c.Clipper.prototype.EdgesAdjacent=function(a){return a.Edge1.NextInSEL===a.Edge2||a.Edge1.PrevInSEL===a.Edge2};c.Clipper.IntersectNodeSort=function(a,b){return b.Pt.Y-a.Pt.Y};c.Clipper.prototype.FixupIntersectionOrder=function(){this.m_IntersectList.sort(this.m_IntersectNodeComparer);this.CopyAELToSEL();for(var a=this.m_IntersectList.length,b=0;b<a;b++){if(!this.EdgesAdjacent(this.m_IntersectList[b])){for(var d=b+1;d<a&&!this.EdgesAdjacent(this.m_IntersectList[d]);)d++;if(d===a)return!1;var c=
    this.m_IntersectList[b];this.m_IntersectList[b]=this.m_IntersectList[d];this.m_IntersectList[d]=c}this.SwapPositionsInSEL(this.m_IntersectList[b].Edge1,this.m_IntersectList[b].Edge2)}return!0};c.Clipper.prototype.ProcessIntersectList=function(){for(var a=0,b=this.m_IntersectList.length;a<b;a++){var d=this.m_IntersectList[a];this.IntersectEdges(d.Edge1,d.Edge2,d.Pt);this.SwapPositionsInAEL(d.Edge1,d.Edge2)}this.m_IntersectList.length=0};c.Clipper.TopX=function(a,b){return b===a.Top.Y?a.Top.X:a.Bot.X+
    a.Dx*(b-a.Bot.Y)};c.Clipper.prototype.IntersectPoint=function(a,b,d){d.X=0;d.Y=0;if(a.Dx===b.Dx)d.Y=a.Curr.Y,d.X=c.Clipper.TopX(a,d.Y);else{if(0===a.Delta.X)if(d.X=a.Bot.X,c.ClipperBase.IsHorizontal(b))d.Y=b.Bot.Y;else{var e=b.Bot.Y-b.Bot.X/b.Dx;d.Y=d.X/b.Dx+e}else if(0===b.Delta.X)if(d.X=b.Bot.X,c.ClipperBase.IsHorizontal(a))d.Y=a.Bot.Y;else{var f=a.Bot.Y-a.Bot.X/a.Dx;d.Y=d.X/a.Dx+f}else{f=a.Bot.X-a.Bot.Y*a.Dx;e=b.Bot.X-b.Bot.Y*b.Dx;var g=(e-f)/(a.Dx-b.Dx);d.Y=g;d.X=Math.abs(a.Dx)<Math.abs(b.Dx)?
    a.Dx*g+f:b.Dx*g+e}if(d.Y<a.Top.Y||d.Y<b.Top.Y){if(a.Top.Y>b.Top.Y)return d.Y=a.Top.Y,d.X=c.Clipper.TopX(b,a.Top.Y),d.X<a.Top.X;d.Y=b.Top.Y;d.X=Math.abs(a.Dx)<Math.abs(b.Dx)?c.Clipper.TopX(a,d.Y):c.Clipper.TopX(b,d.Y)}d.Y>a.Curr.Y&&(d.Y=a.Curr.Y,d.X=Math.abs(a.Dx)>Math.abs(b.Dx)?c.Clipper.TopX(b,d.Y):c.Clipper.TopX(a,d.Y))}};c.Clipper.prototype.ProcessEdgesAtTopOfScanbeam=function(a){for(var b,d,e=this.m_ActiveEdges;null!==e;){if(d=this.IsMaxima(e,a))d=this.GetMaximaPairEx(e),d=null===d||!c.ClipperBase.IsHorizontal(d);
    if(d)this.StrictlySimple&&this.InsertMaxima(e.Top.X),b=e.PrevInAEL,this.DoMaxima(e),e=null===b?this.m_ActiveEdges:b.NextInAEL;else{this.IsIntermediate(e,a)&&c.ClipperBase.IsHorizontal(e.NextInLML)?(e=this.UpdateEdgeIntoAEL(e),0<=e.OutIdx&&this.AddOutPt(e,e.Bot),this.AddEdgeToSEL(e)):(e.Curr.X=c.Clipper.TopX(e,a),e.Curr.Y=a);c.use_xyz&&(e.Curr.Z=e.Top.Y===a?e.Top.Z:e.Bot.Y===a?e.Bot.Z:0);if(this.StrictlySimple&&(b=e.PrevInAEL,0<=e.OutIdx&&0!==e.WindDelta&&null!==b&&0<=b.OutIdx&&b.Curr.X===e.Curr.X&&
    0!==b.WindDelta)){var f=new c.FPoint1(e.Curr);c.use_xyz&&this.SetZ(f,b,e);d=this.AddOutPt(b,f);b=this.AddOutPt(e,f);this.AddJoin(d,b,f)}e=e.NextInAEL}}this.ProcessHorizontals();this.m_Maxima=null;for(e=this.m_ActiveEdges;null!==e;)this.IsIntermediate(e,a)&&(d=null,0<=e.OutIdx&&(d=this.AddOutPt(e,e.Top)),e=this.UpdateEdgeIntoAEL(e),b=e.PrevInAEL,f=e.NextInAEL,null!==b&&b.Curr.X===e.Bot.X&&b.Curr.Y===e.Bot.Y&&null!==d&&0<=b.OutIdx&&b.Curr.Y===b.Top.Y&&c.ClipperBase.SlopesEqual5(e.Curr,e.Top,b.Curr,
    b.Top)&&0!==e.WindDelta&&0!==b.WindDelta?(b=this.AddOutPt(ePrev2,e.Bot),this.AddJoin(d,b,e.Top)):null!==f&&f.Curr.X===e.Bot.X&&f.Curr.Y===e.Bot.Y&&null!==d&&0<=f.OutIdx&&f.Curr.Y===f.Top.Y&&c.ClipperBase.SlopesEqual5(e.Curr,e.Top,f.Curr,f.Top)&&0!==e.WindDelta&&0!==f.WindDelta&&(b=this.AddOutPt(f,e.Bot),this.AddJoin(d,b,e.Top))),e=e.NextInAEL};c.Clipper.prototype.DoMaxima=function(a){var b=this.GetMaximaPairEx(a);if(null===b)0<=a.OutIdx&&this.AddOutPt(a,a.Top),this.DeleteFromAEL(a);else{for(var d=
    a.NextInAEL;null!==d&&d!==b;)this.IntersectEdges(a,d,a.Top),this.SwapPositionsInAEL(a,d),d=a.NextInAEL;-1===a.OutIdx&&-1===b.OutIdx?(this.DeleteFromAEL(a),this.DeleteFromAEL(b)):0<=a.OutIdx&&0<=b.OutIdx?(0<=a.OutIdx&&this.AddLocalMaxPoly(a,b,a.Top),this.DeleteFromAEL(a),this.DeleteFromAEL(b)):c.use_lines&&0===a.WindDelta?(0<=a.OutIdx&&(this.AddOutPt(a,a.Top),a.OutIdx=c.ClipperBase.Unassigned),this.DeleteFromAEL(a),0<=b.OutIdx&&(this.AddOutPt(b,a.Top),b.OutIdx=c.ClipperBase.Unassigned),this.DeleteFromAEL(b)):
    c.Error("DoMaxima error")}};c.Clipper.ReversePaths=function(a){for(var b=0,d=a.length;b<d;b++)a[b].reverse()};c.Clipper.Orientation=function(a){return 0<=c.Clipper.Area(a)};c.Clipper.prototype.PointCount=function(a){if(null===a)return 0;var b=0,d=a;do b++,d=d.Next;while(d!==a);return b};c.Clipper.prototype.BuildResult=function(a){c.Clear(a);for(var b=0,d=this.m_PolyOuts.length;b<d;b++){var e=this.m_PolyOuts[b];if(null!==e.Pts){e=e.Pts.Prev;var f=this.PointCount(e);if(!(2>f)){for(var g=Array(f),h=
    0;h<f;h++)g[h]=e.Pt,e=e.Prev;a.push(g)}}}};c.Clipper.prototype.BuildResult2=function(a){a.Clear();for(var b=0,d=this.m_PolyOuts.length;b<d;b++){var e=this.m_PolyOuts[b];var f=this.PointCount(e.Pts);if(!(e.IsOpen&&2>f||!e.IsOpen&&3>f)){this.FixHoleLinkage(e);var g=new c.PolyNode;a.m_AllPolys.push(g);e.PolyNode=g;g.m_polygon.length=f;e=e.Pts.Prev;for(var h=0;h<f;h++)g.m_polygon[h]=e.Pt,e=e.Prev}}b=0;for(d=this.m_PolyOuts.length;b<d;b++)e=this.m_PolyOuts[b],null!==e.PolyNode&&(e.IsOpen?(e.PolyNode.IsOpen=
    !0,a.AddChild(e.PolyNode)):null!==e.FirstLeft&&null!==e.FirstLeft.PolyNode?e.FirstLeft.PolyNode.AddChild(e.PolyNode):a.AddChild(e.PolyNode))};c.Clipper.prototype.FixupOutPolyline=function(a){for(var b=a.Pts,d=b.Prev;b!==d;)if(b=b.Next,c.FPoint.op_Equality(b.Pt,b.Prev.Pt)){b===d&&(d=b.Prev);var e=b.Prev;e.Next=b.Next;b=b.Next.Prev=e}b===b.Prev&&(a.Pts=null)};c.Clipper.prototype.FixupOutPolygon=function(a){var b=null;a.BottomPt=null;for(var d=a.Pts,e=this.PreserveCollinear||this.StrictlySimple;;){if(d.Prev===
    d||d.Prev===d.Next){a.Pts=null;return}if(c.FPoint.op_Equality(d.Pt,d.Next.Pt)||c.FPoint.op_Equality(d.Pt,d.Prev.Pt)||c.ClipperBase.SlopesEqual4(d.Prev.Pt,d.Pt,d.Next.Pt)&&(!e||!this.Pt2IsBetweenPt1AndPt3(d.Prev.Pt,d.Pt,d.Next.Pt)))b=null,d.Prev.Next=d.Next,d=d.Next.Prev=d.Prev;else if(d===b)break;else null===b&&(b=d),d=d.Next}a.Pts=d};c.Clipper.prototype.DupOutPt=function(a,b){var d=new c.OutPt;d.Pt.X=a.Pt.X;d.Pt.Y=a.Pt.Y;c.use_xyz&&(d.Pt.Z=a.Pt.Z);d.Idx=a.Idx;b?(d.Next=a.Next,d.Prev=a,a.Next.Prev=
    d,a.Next=d):(d.Prev=a.Prev,d.Next=a,a.Prev.Next=d,a.Prev=d);return d};c.Clipper.prototype.GetOverlap=function(a,b,d,c,f){a<b?d<c?(f.Left=Math.max(a,d),f.Right=Math.min(b,c)):(f.Left=Math.max(a,c),f.Right=Math.min(b,d)):d<c?(f.Left=Math.max(b,d),f.Right=Math.min(a,c)):(f.Left=Math.max(b,c),f.Right=Math.min(a,d));return f.Left<f.Right};c.Clipper.prototype.JoinHorz=function(a,b,d,e,f,g){var h=a.Pt.X>b.Pt.X?c.Direction.dRightToLeft:c.Direction.dLeftToRight;e=d.Pt.X>e.Pt.X?c.Direction.dRightToLeft:c.Direction.dLeftToRight;
    if(h===e)return!1;if(h===c.Direction.dLeftToRight){for(;a.Next.Pt.X<=f.X&&a.Next.Pt.X>=a.Pt.X&&a.Next.Pt.Y===f.Y;)a=a.Next;g&&a.Pt.X!==f.X&&(a=a.Next);b=this.DupOutPt(a,!g);c.FPoint.op_Inequality(b.Pt,f)&&(a=b,a.Pt.X=f.X,a.Pt.Y=f.Y,c.use_xyz&&(a.Pt.Z=f.Z),b=this.DupOutPt(a,!g))}else{for(;a.Next.Pt.X>=f.X&&a.Next.Pt.X<=a.Pt.X&&a.Next.Pt.Y===f.Y;)a=a.Next;g||a.Pt.X===f.X||(a=a.Next);b=this.DupOutPt(a,g);c.FPoint.op_Inequality(b.Pt,f)&&(a=b,a.Pt.X=f.X,a.Pt.Y=f.Y,c.use_xyz&&(a.Pt.Z=f.Z),b=this.DupOutPt(a,
    g))}if(e===c.Direction.dLeftToRight){for(;d.Next.Pt.X<=f.X&&d.Next.Pt.X>=d.Pt.X&&d.Next.Pt.Y===f.Y;)d=d.Next;g&&d.Pt.X!==f.X&&(d=d.Next);e=this.DupOutPt(d,!g);c.FPoint.op_Inequality(e.Pt,f)&&(d=e,d.Pt.X=f.X,d.Pt.Y=f.Y,c.use_xyz&&(d.Pt.Z=f.Z),e=this.DupOutPt(d,!g))}else{for(;d.Next.Pt.X>=f.X&&d.Next.Pt.X<=d.Pt.X&&d.Next.Pt.Y===f.Y;)d=d.Next;g||d.Pt.X===f.X||(d=d.Next);e=this.DupOutPt(d,g);c.FPoint.op_Inequality(e.Pt,f)&&(d=e,d.Pt.X=f.X,d.Pt.Y=f.Y,c.use_xyz&&(d.Pt.Z=f.Z),e=this.DupOutPt(d,g))}h===c.Direction.dLeftToRight===
    g?(a.Prev=d,d.Next=a,b.Next=e,e.Prev=b):(a.Next=d,d.Prev=a,b.Prev=e,e.Next=b);return!0};c.Clipper.prototype.JoinPoints=function(a,b,d){var e=a.OutPt1,f;new c.OutPt;var g=a.OutPt2,h;new c.OutPt;if((h=a.OutPt1.Pt.Y===a.OffPt.Y)&&c.FPoint.op_Equality(a.OffPt,a.OutPt1.Pt)&&c.FPoint.op_Equality(a.OffPt,a.OutPt2.Pt)){if(b!==d)return!1;for(f=a.OutPt1.Next;f!==e&&c.FPoint.op_Equality(f.Pt,a.OffPt);)f=f.Next;f=f.Pt.Y>a.OffPt.Y;for(h=a.OutPt2.Next;h!==g&&c.FPoint.op_Equality(h.Pt,a.OffPt);)h=h.Next;if(f===
    h.Pt.Y>a.OffPt.Y)return!1;f?(f=this.DupOutPt(e,!1),h=this.DupOutPt(g,!0),e.Prev=g,g.Next=e,f.Next=h,h.Prev=f):(f=this.DupOutPt(e,!0),h=this.DupOutPt(g,!1),e.Next=g,g.Prev=e,f.Prev=h,h.Next=f);a.OutPt1=e;a.OutPt2=f;return!0}if(h){for(f=e;e.Prev.Pt.Y===e.Pt.Y&&e.Prev!==f&&e.Prev!==g;)e=e.Prev;for(;f.Next.Pt.Y===f.Pt.Y&&f.Next!==e&&f.Next!==g;)f=f.Next;if(f.Next===e||f.Next===g)return!1;for(h=g;g.Prev.Pt.Y===g.Pt.Y&&g.Prev!==h&&g.Prev!==f;)g=g.Prev;for(;h.Next.Pt.Y===h.Pt.Y&&h.Next!==g&&h.Next!==e;)h=
    h.Next;if(h.Next===g||h.Next===e)return!1;d={Left:null,Right:null};if(!this.GetOverlap(e.Pt.X,f.Pt.X,g.Pt.X,h.Pt.X,d))return!1;b=d.Left;var l=d.Right;d=new c.FPoint0;e.Pt.X>=b&&e.Pt.X<=l?(d.X=e.Pt.X,d.Y=e.Pt.Y,c.use_xyz&&(d.Z=e.Pt.Z),b=e.Pt.X>f.Pt.X):g.Pt.X>=b&&g.Pt.X<=l?(d.X=g.Pt.X,d.Y=g.Pt.Y,c.use_xyz&&(d.Z=g.Pt.Z),b=g.Pt.X>h.Pt.X):f.Pt.X>=b&&f.Pt.X<=l?(d.X=f.Pt.X,d.Y=f.Pt.Y,c.use_xyz&&(d.Z=f.Pt.Z),b=f.Pt.X>e.Pt.X):(d.X=h.Pt.X,d.Y=h.Pt.Y,c.use_xyz&&(d.Z=h.Pt.Z),b=h.Pt.X>g.Pt.X);a.OutPt1=e;a.OutPt2=
    g;return this.JoinHorz(e,f,g,h,d,b)}for(f=e.Next;c.FPoint.op_Equality(f.Pt,e.Pt)&&f!==e;)f=f.Next;if(l=f.Pt.Y>e.Pt.Y||!c.ClipperBase.SlopesEqual4(e.Pt,f.Pt,a.OffPt)){for(f=e.Prev;c.FPoint.op_Equality(f.Pt,e.Pt)&&f!==e;)f=f.Prev;if(f.Pt.Y>e.Pt.Y||!c.ClipperBase.SlopesEqual4(e.Pt,f.Pt,a.OffPt))return!1}for(h=g.Next;c.FPoint.op_Equality(h.Pt,g.Pt)&&h!==g;)h=h.Next;var k=h.Pt.Y>g.Pt.Y||!c.ClipperBase.SlopesEqual4(g.Pt,h.Pt,a.OffPt);if(k){for(h=g.Prev;c.FPoint.op_Equality(h.Pt,g.Pt)&&h!==g;)h=h.Prev;if(h.Pt.Y>
    g.Pt.Y||!c.ClipperBase.SlopesEqual4(g.Pt,h.Pt,a.OffPt))return!1}if(f===e||h===g||f===h||b===d&&l===k)return!1;l?(f=this.DupOutPt(e,!1),h=this.DupOutPt(g,!0),e.Prev=g,g.Next=e,f.Next=h,h.Prev=f):(f=this.DupOutPt(e,!0),h=this.DupOutPt(g,!1),e.Next=g,g.Prev=e,f.Prev=h,h.Next=f);a.OutPt1=e;a.OutPt2=f;return!0};c.Clipper.GetBounds=function(a){for(var b=0,d=a.length;b<d&&0===a[b].length;)b++;if(b===d)return new c.FRect(0,0,0,0);var e=new c.FRect;e.left=a[b][0].X;e.right=e.left;e.top=a[b][0].Y;for(e.bottom=
    e.top;b<d;b++)for(var f=0,g=a[b].length;f<g;f++)a[b][f].X<e.left?e.left=a[b][f].X:a[b][f].X>e.right&&(e.right=a[b][f].X),a[b][f].Y<e.top?e.top=a[b][f].Y:a[b][f].Y>e.bottom&&(e.bottom=a[b][f].Y);return e};c.Clipper.prototype.GetBounds2=function(a){var b=a,d=new c.FRect;d.left=a.Pt.X;d.right=a.Pt.X;d.top=a.Pt.Y;d.bottom=a.Pt.Y;for(a=a.Next;a!==b;)a.Pt.X<d.left&&(d.left=a.Pt.X),a.Pt.X>d.right&&(d.right=a.Pt.X),a.Pt.Y<d.top&&(d.top=a.Pt.Y),a.Pt.Y>d.bottom&&(d.bottom=a.Pt.Y),a=a.Next;return d};c.Clipper.PointInPolygon=
    function(a,b){var c=0,e=b.length;if(3>e)return 0;for(var f=b[0],g=1;g<=e;++g){var h=g===e?b[0]:b[g];if(h.Y===a.Y&&(h.X===a.X||f.Y===a.Y&&h.X>a.X===f.X<a.X))return-1;if(f.Y<a.Y!==h.Y<a.Y)if(f.X>=a.X)if(h.X>a.X)c=1-c;else{var l=(f.X-a.X)*(h.Y-a.Y)-(h.X-a.X)*(f.Y-a.Y);if(0===l)return-1;0<l===h.Y>f.Y&&(c=1-c)}else if(h.X>a.X){l=(f.X-a.X)*(h.Y-a.Y)-(h.X-a.X)*(f.Y-a.Y);if(0===l)return-1;0<l===h.Y>f.Y&&(c=1-c)}f=h}return c};c.Clipper.prototype.PointInPolygon=function(a,b){var c=0,e=b,f=a.X,g=a.Y;var h=b.Pt.X;
    var l=b.Pt.Y;do{b=b.Next;var k=b.Pt.X,m=b.Pt.Y;if(m===g&&(k===f||l===g&&k>f===h<f))return-1;if(l<g!==m<g)if(h>=f)if(k>f)c=1-c;else{h=(h-f)*(m-g)-(k-f)*(l-g);if(0===h)return-1;0<h===m>l&&(c=1-c)}else if(k>f){h=(h-f)*(m-g)-(k-f)*(l-g);if(0===h)return-1;0<h===m>l&&(c=1-c)}h=k;l=m}while(e!==b);return c};c.Clipper.prototype.Poly2ContainsPoly1=function(a,b){var c=a;do{var e=this.PointInPolygon(c.Pt,b);if(0<=e)return 0<e;c=c.Next}while(c!==a);return!0};c.Clipper.prototype.FixupFirstLefts1=function(a,b){for(var d,
    e,f=0,g=this.m_PolyOuts.length;f<g;f++)d=this.m_PolyOuts[f],e=c.Clipper.ParseFirstLeft(d.FirstLeft),null!==d.Pts&&e===a&&this.Poly2ContainsPoly1(d.Pts,b.Pts)&&(d.FirstLeft=b)};c.Clipper.prototype.FixupFirstLefts2=function(a,b){for(var d=b.FirstLeft,e,f,g=0,h=this.m_PolyOuts.length;g<h;g++)if(e=this.m_PolyOuts[g],null!==e.Pts&&e!==b&&e!==a&&(f=c.Clipper.ParseFirstLeft(e.FirstLeft),f===d||f===a||f===b))if(this.Poly2ContainsPoly1(e.Pts,a.Pts))e.FirstLeft=a;else if(this.Poly2ContainsPoly1(e.Pts,b.Pts))e.FirstLeft=
    b;else if(e.FirstLeft===a||e.FirstLeft===b)e.FirstLeft=d};c.Clipper.prototype.FixupFirstLefts3=function(a,b){for(var d,e,f=0,g=this.m_PolyOuts.length;f<g;f++)d=this.m_PolyOuts[f],e=c.Clipper.ParseFirstLeft(d.FirstLeft),null!==d.Pts&&e===a&&(d.FirstLeft=b)};c.Clipper.ParseFirstLeft=function(a){for(;null!==a&&null===a.Pts;)a=a.FirstLeft;return a};c.Clipper.prototype.JoinCommonEdges=function(){for(var a=0,b=this.m_Joins.length;a<b;a++){var c=this.m_Joins[a],e=this.GetOutRec(c.OutPt1.Idx),f=this.GetOutRec(c.OutPt2.Idx);
    if(null!==e.Pts&&null!==f.Pts&&!e.IsOpen&&!f.IsOpen){var g=e===f?e:this.OutRec1RightOfOutRec2(e,f)?f:this.OutRec1RightOfOutRec2(f,e)?e:this.GetLowermostRec(e,f);this.JoinPoints(c,e,f)&&(e===f?(e.Pts=c.OutPt1,e.BottomPt=null,f=this.CreateOutRec(),f.Pts=c.OutPt2,this.UpdateOutPtIdxs(f),this.Poly2ContainsPoly1(f.Pts,e.Pts)?(f.IsHole=!e.IsHole,f.FirstLeft=e,this.m_UsingPolyTree&&this.FixupFirstLefts2(f,e),(f.IsHole^this.ReverseSolution)==0<this.Area$1(f)&&this.ReversePolyPtLinks(f.Pts)):this.Poly2ContainsPoly1(e.Pts,
    f.Pts)?(f.IsHole=e.IsHole,e.IsHole=!f.IsHole,f.FirstLeft=e.FirstLeft,e.FirstLeft=f,this.m_UsingPolyTree&&this.FixupFirstLefts2(e,f),(e.IsHole^this.ReverseSolution)==0<this.Area$1(e)&&this.ReversePolyPtLinks(e.Pts)):(f.IsHole=e.IsHole,f.FirstLeft=e.FirstLeft,this.m_UsingPolyTree&&this.FixupFirstLefts1(e,f))):(f.Pts=null,f.BottomPt=null,f.Idx=e.Idx,e.IsHole=g.IsHole,g===f&&(e.FirstLeft=f.FirstLeft),f.FirstLeft=e,this.m_UsingPolyTree&&this.FixupFirstLefts3(f,e)))}}};c.Clipper.prototype.UpdateOutPtIdxs=
    function(a){var b=a.Pts;do b.Idx=a.Idx,b=b.Prev;while(b!==a.Pts)};c.Clipper.prototype.DoSimplePolygons=function(){for(var a=0;a<this.m_PolyOuts.length;){var b=this.m_PolyOuts[a++],d=b.Pts;if(null!==d&&!b.IsOpen){do{for(var e=d.Next;e!==b.Pts;){if(c.FPoint.op_Equality(d.Pt,e.Pt)&&e.Next!==d&&e.Prev!==d){var f=d.Prev,g=e.Prev;d.Prev=g;g.Next=d;e.Prev=f;f.Next=e;b.Pts=d;f=this.CreateOutRec();f.Pts=e;this.UpdateOutPtIdxs(f);this.Poly2ContainsPoly1(f.Pts,b.Pts)?(f.IsHole=!b.IsHole,f.FirstLeft=b,this.m_UsingPolyTree&&
    this.FixupFirstLefts2(f,b)):this.Poly2ContainsPoly1(b.Pts,f.Pts)?(f.IsHole=b.IsHole,b.IsHole=!f.IsHole,f.FirstLeft=b.FirstLeft,b.FirstLeft=f,this.m_UsingPolyTree&&this.FixupFirstLefts2(b,f)):(f.IsHole=b.IsHole,f.FirstLeft=b.FirstLeft,this.m_UsingPolyTree&&this.FixupFirstLefts1(b,f));e=d}e=e.Next}d=d.Next}while(d!==b.Pts)}}};c.Clipper.Area=function(a){if(!Array.isArray(a))return 0;var b=a.length;if(3>b)return 0;for(var c=0,e=0,f=b-1;e<b;++e)c+=(a[f].X+a[e].X)*(a[f].Y-a[e].Y),f=e;return.5*-c};c.Clipper.prototype.Area=
    function(a){var b=a;if(null===a)return 0;var c=0;do c+=(a.Prev.Pt.X+a.Pt.X)*(a.Prev.Pt.Y-a.Pt.Y),a=a.Next;while(a!==b);return.5*c};c.Clipper.prototype.Area$1=function(a){return this.Area(a.Pts)};c.Clipper.SimplifyPolygon=function(a,b){var d=[],e=new c.Clipper(0);e.StrictlySimple=!0;e.AddPath(a,c.PolyType.ptSubject,!0);e.Execute(c.ClipType.ctUnion,d,b,b);return d};c.Clipper.SimplifyPolygons=function(a,b){"undefined"===typeof b&&(b=c.PolyFillType.pftEvenOdd);var d=[],e=new c.Clipper(0);e.StrictlySimple=
    !0;e.AddPaths(a,c.PolyType.ptSubject,!0);e.Execute(c.ClipType.ctUnion,d,b,b);return d};c.Clipper.DistanceSqrd=function(a,b){var c=a.X-b.X,e=a.Y-b.Y;return c*c+e*e};c.Clipper.DistanceFromLineSqrd=function(a,b,c){var d=b.Y-c.Y;c=c.X-b.X;b=d*b.X+c*b.Y;b=d*a.X+c*a.Y-b;return b*b/(d*d+c*c)};c.Clipper.SlopesNearCollinear=function(a,b,d,e){return Math.abs(a.X-b.X)>Math.abs(a.Y-b.Y)?a.X>b.X===a.X<d.X?c.Clipper.DistanceFromLineSqrd(a,b,d)<e:b.X>a.X===b.X<d.X?c.Clipper.DistanceFromLineSqrd(b,a,d)<e:c.Clipper.DistanceFromLineSqrd(d,
    a,b)<e:a.Y>b.Y===a.Y<d.Y?c.Clipper.DistanceFromLineSqrd(a,b,d)<e:b.Y>a.Y===b.Y<d.Y?c.Clipper.DistanceFromLineSqrd(b,a,d)<e:c.Clipper.DistanceFromLineSqrd(d,a,b)<e};c.Clipper.PointsAreClose=function(a,b,c){var d=a.X-b.X;a=a.Y-b.Y;return d*d+a*a<=c};c.Clipper.ExcludeOp=function(a){var b=a.Prev;b.Next=a.Next;a.Next.Prev=b;b.Idx=0;return b};c.Clipper.CleanPolygon=function(a,b){"undefined"===typeof b&&(b=1.415);var d=a.length;if(0===d)return[];for(var e=Array(d),f=0;f<d;++f)e[f]=new c.OutPt;for(f=0;f<
    d;++f)e[f].Pt=a[f],e[f].Next=e[(f+1)%d],e[f].Next.Prev=e[f],e[f].Idx=0;f=b*b;for(e=e[0];0===e.Idx&&e.Next!==e.Prev;)c.Clipper.PointsAreClose(e.Pt,e.Prev.Pt,f)?(e=c.Clipper.ExcludeOp(e),d--):c.Clipper.PointsAreClose(e.Prev.Pt,e.Next.Pt,f)?(c.Clipper.ExcludeOp(e.Next),e=c.Clipper.ExcludeOp(e),d-=2):c.Clipper.SlopesNearCollinear(e.Prev.Pt,e.Pt,e.Next.Pt,f)?(e=c.Clipper.ExcludeOp(e),d--):(e.Idx=1,e=e.Next);3>d&&(d=0);var g=Array(d);for(f=0;f<d;++f)g[f]=new c.FPoint1(e.Pt),e=e.Next;return g};c.Clipper.CleanPolygons=
    function(a,b){for(var d=Array(a.length),e=0,f=a.length;e<f;e++)d[e]=c.Clipper.CleanPolygon(a[e],b);return d};c.Clipper.Minkowski=function(a,b,d,e){e=e?1:0;var f=a.length,g=b.length,h=[];if(d)for(d=0;d<g;d++){var l=Array(f);for(var k=0,m=a.length,p=a[k];k<m;k++,p=a[k])l[k]=new c.FPoint2(b[d].X+p.X,b[d].Y+p.Y);h.push(l)}else for(d=0;d<g;d++){l=Array(f);k=0;m=a.length;for(p=a[k];k<m;k++,p=a[k])l[k]=new c.FPoint2(b[d].X-p.X,b[d].Y-p.Y);h.push(l)}a=[];for(d=0;d<g-1+e;d++)for(k=0;k<f;k++)b=[],b.push(h[d%
    g][k%f]),b.push(h[(d+1)%g][k%f]),b.push(h[(d+1)%g][(k+1)%f]),b.push(h[d%g][(k+1)%f]),c.Clipper.Orientation(b)||b.reverse(),a.push(b);return a};c.Clipper.MinkowskiSum=function(a,b,d){if(b[0]instanceof Array){var e=b;var f=new c.Paths;b=new c.Clipper;for(var g=0;g<e.length;++g){var h=c.Clipper.Minkowski(a,e[g],!0,d);b.AddPaths(h,c.PolyType.ptSubject,!0);d&&(h=c.Clipper.TranslatePath(e[g],a[0]),b.AddPath(h,c.PolyType.ptClip,!0))}b.Execute(c.ClipType.ctUnion,f,c.PolyFillType.pftNonZero,c.PolyFillType.pftNonZero);
    return f}e=c.Clipper.Minkowski(a,b,!0,d);b=new c.Clipper;b.AddPaths(e,c.PolyType.ptSubject,!0);b.Execute(c.ClipType.ctUnion,e,c.PolyFillType.pftNonZero,c.PolyFillType.pftNonZero);return e};c.Clipper.TranslatePath=function(a,b){for(var d=new c.Path,e=0;e<a.length;e++)d.push(new c.FPoint2(a[e].X+b.X,a[e].Y+b.Y));return d};c.Clipper.MinkowskiDiff=function(a,b){var d=c.Clipper.Minkowski(a,b,!1,!0),e=new c.Clipper;e.AddPaths(d,c.PolyType.ptSubject,!0);e.Execute(c.ClipType.ctUnion,d,c.PolyFillType.pftNonZero,
    c.PolyFillType.pftNonZero);return d};c.Clipper.PolyTreeToPaths=function(a){var b=[];c.Clipper.AddPolyNodeToPaths(a,c.Clipper.NodeType.ntAny,b);return b};c.Clipper.AddPolyNodeToPaths=function(a,b,d){var e=!0;switch(b){case c.Clipper.NodeType.ntOpen:return;case c.Clipper.NodeType.ntClosed:e=!a.IsOpen}0<a.m_polygon.length&&e&&d.push(a.m_polygon);e=0;a=a.Childs();for(var f=a.length,g=a[e];e<f;e++,g=a[e])c.Clipper.AddPolyNodeToPaths(g,b,d)};c.Clipper.OpenPathsFromPolyTree=function(a){for(var b=new c.Paths,
    d=0,e=a.ChildCount();d<e;d++)a.Childs()[d].IsOpen&&b.push(a.Childs()[d].m_polygon);return b};c.Clipper.ClosedPathsFromPolyTree=function(a){var b=new c.Paths;c.Clipper.AddPolyNodeToPaths(a,c.Clipper.NodeType.ntClosed,b);return b};r(c.Clipper,c.ClipperBase);c.Clipper.NodeType={ntAny:0,ntOpen:1,ntClosed:2};c.ClipperOffset=function(a,b){"undefined"===typeof a&&(a=2);"undefined"===typeof b&&(b=c.ClipperOffset.def_arc_tolerance);this.m_destPolys=new c.Paths;this.m_srcPoly=new c.Path;this.m_destPoly=new c.Path;
    this.m_normals=[];this.m_StepsPerRad=this.m_miterLim=this.m_cos=this.m_sin=this.m_sinA=this.m_delta=0;this.m_lowest=new c.FPoint0;this.m_polyNodes=new c.PolyNode;this.MiterLimit=a;this.ArcTolerance=b;this.m_lowest.X=-1};c.ClipperOffset.two_pi=6.28318530717959;c.ClipperOffset.def_arc_tolerance=.25;c.ClipperOffset.prototype.Clear=function(){c.Clear(this.m_polyNodes.Childs());this.m_lowest.X=-1};c.ClipperOffset.prototype.AddPath=function(a,b,d){var e=a.length-1;if(!(0>e)){var f=new c.PolyNode;f.m_jointype=
    b;f.m_endtype=d;if(d===c.EndType.etClosedLine||d===c.EndType.etClosedPolygon)for(;0<e&&c.FPoint.op_Equality(a[0],a[e]);)e--;f.m_polygon.push(a[0]);var g=0;b=0;for(var h=1;h<=e;h++)c.FPoint.op_Inequality(f.m_polygon[g],a[h])&&(g++,f.m_polygon.push(a[h]),a[h].Y>f.m_polygon[b].Y||a[h].Y===f.m_polygon[b].Y&&a[h].X<f.m_polygon[b].X)&&(b=g);if(!(d===c.EndType.etClosedPolygon&&2>g)&&(this.m_polyNodes.AddChild(f),d===c.EndType.etClosedPolygon))if(0>this.m_lowest.X)this.m_lowest=new c.FPoint2(this.m_polyNodes.ChildCount()-
    1,b);else if(a=this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon[this.m_lowest.Y],f.m_polygon[b].Y>a.Y||f.m_polygon[b].Y===a.Y&&f.m_polygon[b].X<a.X)this.m_lowest=new c.FPoint2(this.m_polyNodes.ChildCount()-1,b)}};c.ClipperOffset.prototype.AddPaths=function(a,b,c){for(var d=0,f=a.length;d<f;d++)this.AddPath(a[d],b,c)};c.ClipperOffset.prototype.FixOrientations=function(){if(0<=this.m_lowest.X&&!c.Clipper.Orientation(this.m_polyNodes.Childs()[this.m_lowest.X].m_polygon))for(var a=0;a<this.m_polyNodes.ChildCount();a++){var b=
    this.m_polyNodes.Childs()[a];(b.m_endtype===c.EndType.etClosedPolygon||b.m_endtype===c.EndType.etClosedLine&&c.Clipper.Orientation(b.m_polygon))&&b.m_polygon.reverse()}else for(a=0;a<this.m_polyNodes.ChildCount();a++)b=this.m_polyNodes.Childs()[a],b.m_endtype!==c.EndType.etClosedLine||c.Clipper.Orientation(b.m_polygon)||b.m_polygon.reverse()};c.ClipperOffset.GetUnitNormal=function(a,b){var d=b.X-a.X,e=b.Y-a.Y;if(0===d&&0===e)return new c.FPoint2(0,0);var f=1/Math.sqrt(d*d+e*e);return new c.FPoint2(e*
    f,-(d*f))};c.ClipperOffset.prototype.DoOffset=function(a){var b;this.m_destPolys=[];this.m_delta=a;if(c.ClipperBase.near_zero(a))for(var d=0;d<this.m_polyNodes.ChildCount();d++){var e=this.m_polyNodes.Childs()[d];e.m_endtype===c.EndType.etClosedPolygon&&this.m_destPolys.push(e.m_polygon)}else{this.m_miterLim=2<this.MiterLimit?2/(this.MiterLimit*this.MiterLimit):.5;var f=3.14159265358979/Math.acos(1-(0>=this.ArcTolerance?c.ClipperOffset.def_arc_tolerance:this.ArcTolerance>Math.abs(a)*c.ClipperOffset.def_arc_tolerance?
    Math.abs(a)*c.ClipperOffset.def_arc_tolerance:this.ArcTolerance)/Math.abs(a));this.m_sin=Math.sin(c.ClipperOffset.two_pi/f);this.m_cos=Math.cos(c.ClipperOffset.two_pi/f);this.m_StepsPerRad=f/c.ClipperOffset.two_pi;0>a&&(this.m_sin=-this.m_sin);for(d=0;d<this.m_polyNodes.ChildCount();d++){e=this.m_polyNodes.Childs()[d];this.m_srcPoly=e.m_polygon;var g=this.m_srcPoly.length;if(!(0===g||0>=a&&(3>g||e.m_endtype!==c.EndType.etClosedPolygon))){this.m_destPoly=[];if(1===g)if(e.m_jointype===c.JoinType.jtRound)for(g=
    1,e=0,b=1;b<=f;b++){this.m_destPoly.push(new c.FPoint2(this.m_srcPoly[0].X+g*a,this.m_srcPoly[0].Y+e*a));var h=g;g=g*this.m_cos-this.m_sin*e;e=h*this.m_sin+e*this.m_cos}else for(e=g=-1,b=0;4>b;++b)this.m_destPoly.push(new c.FPoint2(this.m_srcPoly[0].X+g*a,this.m_srcPoly[0].Y+e*a)),0>g?g=1:0>e?e=1:g=-1;else{for(b=this.m_normals.length=0;b<g-1;b++)this.m_normals.push(c.ClipperOffset.GetUnitNormal(this.m_srcPoly[b],this.m_srcPoly[b+1]));e.m_endtype===c.EndType.etClosedLine||e.m_endtype===c.EndType.etClosedPolygon?
    this.m_normals.push(c.ClipperOffset.GetUnitNormal(this.m_srcPoly[g-1],this.m_srcPoly[0])):this.m_normals.push(new c.FPoint1(this.m_normals[g-2]));if(e.m_endtype===c.EndType.etClosedPolygon)for(h=g-1,b=0;b<g;b++)h=this.OffsetPoint(b,h,e.m_jointype);else if(e.m_endtype===c.EndType.etClosedLine){h=g-1;for(b=0;b<g;b++)h=this.OffsetPoint(b,h,e.m_jointype);this.m_destPolys.push(this.m_destPoly);this.m_destPoly=[];h=this.m_normals[g-1];for(b=g-1;0<b;b--)this.m_normals[b]=new c.FPoint2(-this.m_normals[b-
    1].X,-this.m_normals[b-1].Y);this.m_normals[0]=new c.FPoint2(-h.X,-h.Y);h=0;for(b=g-1;0<=b;b--)h=this.OffsetPoint(b,h,e.m_jointype)}else{h=0;for(b=1;b<g-1;++b)h=this.OffsetPoint(b,h,e.m_jointype);e.m_endtype===c.EndType.etOpenButt?(b=g-1,h=new c.FPoint2(this.m_srcPoly[b].X+this.m_normals[b].X*a,this.m_srcPoly[b].Y+this.m_normals[b].Y*a),this.m_destPoly.push(h),h=new c.FPoint2(this.m_srcPoly[b].X-this.m_normals[b].X*a,this.m_srcPoly[b].Y-this.m_normals[b].Y*a),this.m_destPoly.push(h)):(b=g-1,h=g-2,
    this.m_sinA=0,this.m_normals[b]=new c.FPoint2(-this.m_normals[b].X,-this.m_normals[b].Y),e.m_endtype===c.EndType.etOpenSquare?this.DoSquare(b,h):this.DoRound(b,h));for(b=g-1;0<b;b--)this.m_normals[b]=new c.FPoint2(-this.m_normals[b-1].X,-this.m_normals[b-1].Y);this.m_normals[0]=new c.FPoint2(-this.m_normals[1].X,-this.m_normals[1].Y);h=g-1;for(b=h-1;0<b;--b)h=this.OffsetPoint(b,h,e.m_jointype);e.m_endtype===c.EndType.etOpenButt?(h=new c.FPoint2(this.m_srcPoly[0].X-this.m_normals[0].X*a,this.m_srcPoly[0].Y-
    this.m_normals[0].Y*a),this.m_destPoly.push(h),h=new c.FPoint2(this.m_srcPoly[0].X+this.m_normals[0].X*a,this.m_srcPoly[0].Y+this.m_normals[0].Y*a),this.m_destPoly.push(h)):(this.m_sinA=0,e.m_endtype===c.EndType.etOpenSquare?this.DoSquare(0,1):this.DoRound(0,1))}}this.m_destPolys.push(this.m_destPoly)}}}};c.ClipperOffset.prototype.Execute=function(){var a=arguments;if(a[0]instanceof c.PolyTree){var b=a[0];var d=a[1];b.Clear();this.FixOrientations();this.DoOffset(d);a=new c.Clipper(0);a.AddPaths(this.m_destPolys,
    c.PolyType.ptSubject,!0);if(0<d)a.Execute(c.ClipType.ctUnion,b,c.PolyFillType.pftPositive,c.PolyFillType.pftPositive);else{var e=c.Clipper.GetBounds(this.m_destPolys);d=new c.Path;d.push(new c.FPoint2(e.left-10,e.bottom+10));d.push(new c.FPoint2(e.right+10,e.bottom+10));d.push(new c.FPoint2(e.right+10,e.top-10));d.push(new c.FPoint2(e.left-10,e.top-10));a.AddPath(d,c.PolyType.ptSubject,!0);a.ReverseSolution=!0;a.Execute(c.ClipType.ctUnion,b,c.PolyFillType.pftNegative,c.PolyFillType.pftNegative);if(1===
    b.ChildCount()&&0<b.Childs()[0].ChildCount())for(a=b.Childs()[0],b.Childs()[0]=a.Childs()[0],b.Childs()[0].m_Parent=b,d=1;d<a.ChildCount();d++)b.AddChild(a.Childs()[d]);else b.Clear()}}else b=a[0],d=a[1],c.Clear(b),this.FixOrientations(),this.DoOffset(d),a=new c.Clipper(0),a.AddPaths(this.m_destPolys,c.PolyType.ptSubject,!0),0<d?a.Execute(c.ClipType.ctUnion,b,c.PolyFillType.pftPositive,c.PolyFillType.pftPositive):(e=c.Clipper.GetBounds(this.m_destPolys),d=new c.Path,d.push(new c.FPoint2(e.left-10,
    e.bottom+10)),d.push(new c.FPoint2(e.right+10,e.bottom+10)),d.push(new c.FPoint2(e.right+10,e.top-10)),d.push(new c.FPoint2(e.left-10,e.top-10)),a.AddPath(d,c.PolyType.ptSubject,!0),a.ReverseSolution=!0,a.Execute(c.ClipType.ctUnion,b,c.PolyFillType.pftNegative,c.PolyFillType.pftNegative),0<b.length&&b.splice(0,1))};c.ClipperOffset.prototype.OffsetPoint=function(a,b,d){this.m_sinA=this.m_normals[b].X*this.m_normals[a].Y-this.m_normals[a].X*this.m_normals[b].Y;if(0===this.m_sinA)return b;1<this.m_sinA?
    this.m_sinA=1:-1>this.m_sinA&&(this.m_sinA=-1);if(0>this.m_sinA*this.m_delta)this.m_destPoly.push(new c.FPoint2(this.m_srcPoly[a].X+this.m_normals[b].X*this.m_delta,this.m_srcPoly[a].Y+this.m_normals[b].Y*this.m_delta)),this.m_destPoly.push(new c.FPoint1(this.m_srcPoly[a])),this.m_destPoly.push(new c.FPoint2(this.m_srcPoly[a].X+this.m_normals[a].X*this.m_delta,this.m_srcPoly[a].Y+this.m_normals[a].Y*this.m_delta));else switch(d){case c.JoinType.jtMiter:d=1+(this.m_normals[a].X*this.m_normals[b].X+
    this.m_normals[a].Y*this.m_normals[b].Y);d>=this.m_miterLim?this.DoMiter(a,b,d):this.DoSquare(a,b);break;case c.JoinType.jtSquare:this.DoSquare(a,b);break;case c.JoinType.jtRound:this.DoRound(a,b)}return a};c.ClipperOffset.prototype.DoSquare=function(a,b){var d=Math.tan(Math.atan2(this.m_sinA,this.m_normals[b].X*this.m_normals[a].X+this.m_normals[b].Y*this.m_normals[a].Y)/4);this.m_destPoly.push(new c.FPoint2(this.m_srcPoly[a].X+this.m_delta*(this.m_normals[b].X-this.m_normals[b].Y*d),this.m_srcPoly[a].Y+
    this.m_delta*(this.m_normals[b].Y+this.m_normals[b].X*d)));this.m_destPoly.push(new c.FPoint2(this.m_srcPoly[a].X+this.m_delta*(this.m_normals[a].X+this.m_normals[a].Y*d),this.m_srcPoly[a].Y+this.m_delta*(this.m_normals[a].Y-this.m_normals[a].X*d)))};c.ClipperOffset.prototype.DoMiter=function(a,b,d){d=this.m_delta/d;this.m_destPoly.push(new c.FPoint2(this.m_srcPoly[a].X+(this.m_normals[b].X+this.m_normals[a].X)*d,this.m_srcPoly[a].Y+(this.m_normals[b].Y+this.m_normals[a].Y)*d))};c.ClipperOffset.prototype.DoRound=
    function(a,b){for(var d=Math.max(Math.round(this.m_StepsPerRad*Math.abs(Math.atan2(this.m_sinA,this.m_normals[b].X*this.m_normals[a].X+this.m_normals[b].Y*this.m_normals[a].Y))),1),e=this.m_normals[b].X,f=this.m_normals[b].Y,g,h=0;h<d;++h)this.m_destPoly.push(new c.FPoint2(this.m_srcPoly[a].X+e*this.m_delta,this.m_srcPoly[a].Y+f*this.m_delta)),g=e,e=e*this.m_cos-this.m_sin*f,f=g*this.m_sin+f*this.m_cos;this.m_destPoly.push(new c.FPoint2(this.m_srcPoly[a].X+this.m_normals[a].X*this.m_delta,this.m_srcPoly[a].Y+
    this.m_normals[a].Y*this.m_delta))};c.Error=function(a){try{throw Error(a);}catch(b){alert(b.message)}};c.JS={};c.JS.AreaOfPolygon=function(a){return c.Clipper.Area(a)};c.JS.AreaOfPolygons=function(a){for(var b=0,d=0;d<a.length;d++)b+=c.Clipper.Area(a[d]);return b};c.JS.BoundsOfPath=function(a){return c.JS.BoundsOfPaths([a])};c.JS.BoundsOfPaths=function(a){return c.Clipper.GetBounds(a)};c.JS.Clean=function(a,b){if(!(a instanceof Array))return[];var d=a[0]instanceof Array;a=c.JS.Clone(a);if("number"!==
    typeof b||null===b)return c.Error("Delta is not a number in Clean()."),a;if(0===a.length||1===a.length&&0===a[0].length||0>b)return a;d||(a=[a]);for(var e=a.length,f,g,h,l,k,m,p,n=[],q=0;q<e;q++)if(g=a[q],f=g.length,0!==f)if(3>f)h=g,n.push(h);else{h=g;l=b*b;k=g[0];for(p=m=1;p<f;p++)(g[p].X-k.X)*(g[p].X-k.X)+(g[p].Y-k.Y)*(g[p].Y-k.Y)<=l||(h[m]=g[p],k=g[p],m++);k=g[m-1];(g[0].X-k.X)*(g[0].X-k.X)+(g[0].Y-k.Y)*(g[0].Y-k.Y)<=l&&m--;m<f&&h.splice(m,f-m);h.length&&n.push(h)}!d&&n.length?n=n[0]:d||0!==n.length?
    d&&0===n.length&&(n=[[]]):n=[];return n};c.JS.Clone=function(a){if(!(a instanceof Array)||0===a.length)return[];if(1===a.length&&0===a[0].length)return[[]];var b=a[0]instanceof Array;b||(a=[a]);var c=a.length,e,f,g=Array(c);for(e=0;e<c;e++){var h=a[e].length;var l=Array(h);for(f=0;f<h;f++)l[f]={X:a[e][f].X,Y:a[e][f].Y};g[e]=l}b||(g=g[0]);return g};c.JS.Lighten=function(a,b){if(!(a instanceof Array))return[];if("number"!==typeof b||null===b)return c.Error("Tolerance is not a number in Lighten()."),
    c.JS.Clone(a);if(0===a.length||1===a.length&&0===a[0].length||0>b)return c.JS.Clone(a);var d=a[0]instanceof Array;d||(a=[a]);var e,f,g,h=a.length,l=b*b,k=[];for(e=0;e<h;e++){var m=a[e];var p=m.length;if(0!==p){for(g=0;1E6>g;g++){var n=[];p=m.length;if(m[p-1].X!==m[0].X||m[p-1].Y!==m[0].Y){var q=1;m.push({X:m[0].X,Y:m[0].Y});p=m.length}else q=0;var r=[];for(f=0;f<p-2;f++){var t=m[f];var y=m[f+1];var v=m[f+2];var w=t.X;var x=t.Y;t=v.X-w;var u=v.Y-x;if(0!==t||0!==u){var z=((y.X-w)*t+(y.Y-x)*u)/(t*t+
    u*u);1<z?(w=v.X,x=v.Y):0<z&&(w+=t*z,x+=u*z)}t=y.X-w;u=y.Y-x;v=t*t+u*u;v<=l&&(r[f+1]=1,f++)}n.push({X:m[0].X,Y:m[0].Y});for(f=1;f<p-1;f++)r[f]||n.push({X:m[f].X,Y:m[f].Y});n.push({X:m[p-1].X,Y:m[p-1].Y});q&&m.pop();if(r.length)m=n;else break}p=n.length;n[p-1].X===n[0].X&&n[p-1].Y===n[0].Y&&n.pop();2<n.length&&k.push(n)}}d||(k=k[0]);"undefined"===typeof k&&(k=[]);return k};c.JS.PerimeterOfPath=function(a,b){if("undefined"===typeof a)return 0;var c=Math.sqrt,e=0,f=a.length;if(2>f)return 0;b&&(a[f]=a[0],
    f++);for(;--f;){var g=a[f];var h=g.X;g=g.Y;var l=a[f-1];var k=l.X;l=l.Y;e+=c((h-k)*(h-k)+(g-l)*(g-l))}b&&a.pop();return e};c.JS.PerimeterOfPaths=function(a,b){for(var d=0,e=0;e<a.length;e++)d+=c.JS.PerimeterOfPath(a[e],b);return d};c.ExPolygons=function(){return[]};c.ExPolygon=function(){this.holes=this.outer=null};c.JS.AddOuterPolyNodeToExPolygons=function(a,b){var d=new c.ExPolygon;d.outer=a.Contour();var e=a.Childs(),f=e.length;d.holes=Array(f);var g,h;for(g=0;g<f;g++){var l=e[g];d.holes[g]=l.Contour();
    var k=0;var m=l.Childs();for(h=m.length;k<h;k++)l=m[k],c.JS.AddOuterPolyNodeToExPolygons(l,b)}b.push(d)};c.JS.ExPolygonsToPaths=function(a){var b,d,e=new c.Paths;var f=0;for(b=a.length;f<b;f++){e.push(a[f].outer);var g=0;for(d=a[f].holes.length;g<d;g++)e.push(a[f].holes[g])}return e};c.JS.PolyTreeToExPolygons=function(a){var b=new c.ExPolygons,d;var e=0;var f=a.Childs();for(d=f.length;e<d;e++)a=f[e],c.JS.AddOuterPolyNodeToExPolygons(a,b);return b}})();
    },{}],"@doodle3d/clipper-js":[function(require,module,exports){
    'use strict';
    
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.setErrorCallback = undefined;
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    var _clipper = require('@doodle3d/clipper-lib/clipper');
    
    var _clipper2 = _interopRequireDefault(_clipper);
    
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
    
    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    var errorCallback = void 0;
    var setErrorCallback = exports.setErrorCallback = function setErrorCallback(callback) {
      errorCallback = callback;
    };
    _clipper2.default.Error = function (message) {
      if (errorCallback) errorCallback(message);
    };
    
    var CLIPPER = new _clipper2.default.Clipper();
    var CLIPPER_OFFSET = new _clipper2.default.ClipperOffset();
    
    var Shape = function () {
      function Shape() {
        var paths = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var closed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var capitalConversion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var integerConversion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var removeDuplicates = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    
        _classCallCheck(this, Shape);
    
        this.paths = paths;
        if (capitalConversion) this.paths = this.paths.map(mapLowerToCapital);
        if (integerConversion) this.paths = this.paths.map(mapToRound);
        if (removeDuplicates) this.paths = this.paths.map(filterPathsDuplicates);
        this.closed = closed;
      }
    
      _createClass(Shape, [{
        key: '_clip',
        value: function _clip(type) {
          var solution = new _clipper2.default.PolyTree();
    
          CLIPPER.Clear();
          CLIPPER.AddPaths(this.paths, _clipper2.default.PolyType.ptSubject, this.closed);
    
          for (var _len = arguments.length, clipShapes = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            clipShapes[_key - 1] = arguments[_key];
          }
    
          for (var i = 0; i < clipShapes.length; i++) {
            var clipShape = clipShapes[i];
            CLIPPER.AddPaths(clipShape.paths, _clipper2.default.PolyType.ptClip, clipShape.closed);
          }
          CLIPPER.Execute(type, solution);
    
          var newShape = _clipper2.default.Clipper.PolyTreeToPaths(solution);
          return new Shape(newShape, this.closed);
        }
      }, {
        key: 'union',
        value: function union() {
          for (var _len2 = arguments.length, clipShapes = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            clipShapes[_key2] = arguments[_key2];
          }
    
          return this._clip.apply(this, [_clipper2.default.ClipType.ctUnion].concat(clipShapes));
        }
      }, {
        key: 'difference',
        value: function difference() {
          for (var _len3 = arguments.length, clipShapes = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            clipShapes[_key3] = arguments[_key3];
          }
    
          return this._clip.apply(this, [_clipper2.default.ClipType.ctDifference].concat(clipShapes));
        }
      }, {
        key: 'intersect',
        value: function intersect() {
          for (var _len4 = arguments.length, clipShapes = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            clipShapes[_key4] = arguments[_key4];
          }
    
          return this._clip.apply(this, [_clipper2.default.ClipType.ctIntersection].concat(clipShapes));
        }
      }, {
        key: 'xor',
        value: function xor() {
          for (var _len5 = arguments.length, clipShapes = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            clipShapes[_key5] = arguments[_key5];
          }
    
          return this._clip.apply(this, [_clipper2.default.ClipType.ctXor].concat(clipShapes));
        }
      }, {
        key: 'offset',
        value: function offset(_offset) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var _options$jointType = options.jointType,
              jointType = _options$jointType === undefined ? 'jtSquare' : _options$jointType,
              _options$endType = options.endType,
              endType = _options$endType === undefined ? 'etClosedPolygon' : _options$endType,
              _options$miterLimit = options.miterLimit,
              miterLimit = _options$miterLimit === undefined ? 2.0 : _options$miterLimit,
              _options$roundPrecisi = options.roundPrecision,
              roundPrecision = _options$roundPrecisi === undefined ? 0.25 : _options$roundPrecisi;
    
    
          CLIPPER_OFFSET.Clear();
          CLIPPER_OFFSET.ArcTolerance = roundPrecision;
          CLIPPER_OFFSET.MiterLimit = miterLimit;
    
          var offsetPaths = new _clipper2.default.Paths();
          CLIPPER_OFFSET.AddPaths(this.paths, _clipper2.default.JoinType[jointType], _clipper2.default.EndType[endType]);
          CLIPPER_OFFSET.Execute(offsetPaths, _offset);
    
          return new Shape(offsetPaths, true);
        }
      }, {
        key: 'scaleUp',
        value: function scaleUp(factor) {
          _clipper2.default.JS.ScaleUpPaths(this.paths, factor);
    
          return this;
        }
      }, {
        key: 'scaleDown',
        value: function scaleDown(factor) {
          _clipper2.default.JS.ScaleDownPaths(this.paths, factor);
    
          return this;
        }
      }, {
        key: 'firstPoint',
        value: function firstPoint() {
          var toLower = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    
          if (this.paths.length === 0) {
            return;
          }
    
          var firstPath = this.paths[0];
          var firstPoint = firstPath[0];
          if (toLower) {
            return vectorToLower(firstPoint);
          } else {
            return firstPoint;
          }
        }
      }, {
        key: 'lastPoint',
        value: function lastPoint() {
          var toLower = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    
          if (this.paths.length === 0) {
            return;
          }
    
          var lastPath = this.paths[this.paths.length - 1];
          var lastPoint = this.closed ? lastPath[0] : lastPath[lastPath.length - 1];
          if (toLower) {
            return vectorToLower(lastPoint);
          } else {
            return lastPoint;
          }
        }
      }, {
        key: 'areas',
        value: function areas() {
          var _this = this;
    
          var areas = this.paths.map(function (path, i) {
            return _this.area(i);
          });
          return areas;
        }
      }, {
        key: 'area',
        value: function area(index) {
          var path = this.paths[index];
          var area = _clipper2.default.Clipper.Area(path);
          return area;
        }
      }, {
        key: 'totalArea',
        value: function totalArea() {
          return this.areas().reduce(function (totalArea, area) {
            return totalArea + area;
          }, 0);
        }
      }, {
        key: 'perimeter',
        value: function perimeter(index) {
          var path = this.paths[index];
          var perimeter = _clipper2.default.JS.PerimeterOfPath(path, this.closed, 1);
          return perimeter;
        }
      }, {
        key: 'perimeters',
        value: function perimeters() {
          var _this2 = this;
    
          return this.paths.map(function (path) {
            return _clipper2.default.JS.PerimeterOfPath(path, _this2.closed, 1);
          });
        }
      }, {
        key: 'totalPerimeter',
        value: function totalPerimeter() {
          var perimeter = _clipper2.default.JS.PerimeterOfPaths(this.paths, this.closed);
          return perimeter;
        }
      }, {
        key: 'reverse',
        value: function reverse() {
          _clipper2.default.Clipper.ReversePaths(this.paths);
    
          return this;
        }
      }, {
        key: 'thresholdArea',
        value: function thresholdArea(minArea) {
          var _arr = [].concat(_toConsumableArray(this.paths));
    
          for (var _i = 0; _i < _arr.length; _i++) {
            var path = _arr[_i];
            var area = Math.abs(_clipper2.default.Clipper.Area(path));
    
            if (area < minArea) {
              var index = this.paths.indexOf(path);
              this.paths.splice(index, 1);
            }
          }
          return this;
        }
      }, {
        key: 'join',
        value: function join(shape) {
          var _paths;
    
          (_paths = this.paths).splice.apply(_paths, [this.paths.length, 0].concat(_toConsumableArray(shape.paths)));
    
          return this;
        }
      }, {
        key: 'clone',
        value: function clone() {
          return new Shape(_clipper2.default.JS.Clone(this.paths), this.closed);
        }
      }, {
        key: 'shapeBounds',
        value: function shapeBounds() {
          return _clipper2.default.JS.BoundsOfPaths(this.paths);
        }
      }, {
        key: 'pathBounds',
        value: function pathBounds(index) {
          var path = this.paths[index];
    
          return _clipper2.default.JS.BoundsOfPath(path);
        }
      }, {
        key: 'clean',
        value: function clean(cleanDelta) {
          return new Shape(_clipper2.default.Clipper.CleanPolygons(this.paths, cleanDelta), this.closed);
        }
      }, {
        key: 'orientation',
        value: function orientation(index) {
          var path = this.paths[index];
          return _clipper2.default.Clipper.Orientation(path);
        }
      }, {
        key: 'pointInShape',
        value: function pointInShape(point) {
          var capitalConversion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var integerConversion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    
          if (capitalConversion) point = vectorToCapital(point);
          if (integerConversion) point = roundVector(point);
          for (var i = 0; i < this.paths.length; i++) {
            var pointInPath = this.pointInPath(i, point);
            var orientation = this.orientation(i);
    
            if (!pointInPath && orientation || pointInPath && !orientation) {
              return false;
            }
          }
    
          return true;
        }
      }, {
        key: 'pointInPath',
        value: function pointInPath(index, point) {
          var capitalConversion = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var integerConversion = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    
          if (capitalConversion) point = vectorToCapital(point);
          if (integerConversion) point = roundVector(point);
          var path = this.paths[index];
    
          return _clipper2.default.Clipper.PointInPolygon(point, path) > 0;
        }
      }, {
        key: 'fixOrientation',
        value: function fixOrientation() {
          if (!this.closed) {
            return this;
          }
    
          if (this.totalArea() < 0) {
            this.reverse();
          }
    
          return this;
        }
      }, {
        key: 'simplify',
        value: function simplify(fillType) {
          if (this.closed) {
            var shape = _clipper2.default.Clipper.SimplifyPolygons(this.paths, _clipper2.default.PolyFillType[fillType]);
            return new Shape(shape, true);
          } else {
            return this;
          }
        }
      }, {
        key: 'separateShapes',
        value: function separateShapes() {
          var shapes = [];
    
          if (!this.closed) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
    
            try {
              for (var _iterator = this.paths[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var path = _step.value;
    
                shapes.push(new Shape([path], false));
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          } else {
            var areas = new WeakMap();
            var outlines = [];
            var holes = [];
    
            for (var i = 0; i < this.paths.length; i++) {
              var _path = this.paths[i];
              var orientation = this.orientation(i);
    
              if (orientation) {
                var area = this.area(i);
                areas.set(_path, area);
                outlines.push(_path);
              } else {
                holes.push(_path);
              }
            }
            
            outlines.sort(function (a, b) {
              return areas.get(a) - areas.get(b);
            });
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;
    
            try {
              for (var _iterator2 = outlines[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var outline = _step2.value;
    
                var shape = [outline];
    
                var index = this.paths.indexOf(outline);
    
                var _arr2 = [].concat(holes);
    
                for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
                  var hole = _arr2[_i2];
                  var pointInHole = this.pointInPath(index, hole[0]);
                  if (pointInHole) {
                    shape.push(hole);
    
                    var _index = holes.indexOf(hole);
                    holes.splice(_index, 1);
                  }
                }
    
                shapes.push(new Shape(shape, true));
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
    
          return shapes;
        }
      }, {
        key: 'round',
        value: function round() {
          return new Shape(this.paths.map(mapToRound), this.closed);
        }
      }, {
        key: 'removeDuplicates',
        value: function removeDuplicates() {
          return new Shape(this.paths.map(filterPathsDuplicates), this.closed);
        }
      }, {
        key: 'mapToLower',
        value: function mapToLower() {
          return this.paths.map(mapCapitalToLower);
        }
      }]);
    
      return Shape;
    }();
    
    exports.default = Shape;
    
    
    function mapCapitalToLower(path) {
      return path.map(vectorToLower);
    }
    
    function vectorToLower(_ref) {
      var X = _ref.X,
          Y = _ref.Y;
    
      return { x: X, y: Y };
    }
    
    function mapLowerToCapital(path) {
      return path.map(vectorToCapital);
    }
    
    function vectorToCapital(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
    
      return { X: x, Y: y };
    }
    
    function mapToRound(path) {
      return path.map(roundVector);
    }
    
    function roundVector(_ref3) {
      var X = _ref3.X,
          Y = _ref3.Y;
    
      return { X: Math.round(X), Y: Math.round(Y) };
    }
    
    function filterPathsDuplicates(path) {
      return path.filter(filterPathDuplicates);
    }
    
    function filterPathDuplicates(point, i, array) {
      if (i === 0) return true;
    
      var prevPoint = array[i - 1];
      return !(point.X === prevPoint.X && point.Y === prevPoint.Y);
    }
    
    },{"@doodle3d/clipper-lib/clipper":1}]},{},[]);
var clipperShape = require('@doodle3d/clipper-js').default;    