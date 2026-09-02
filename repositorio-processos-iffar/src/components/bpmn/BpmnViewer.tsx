import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sparkles,
  AlertTriangle,
  Move,
  Scan,
  Layers,
  Image as ImageIcon,
} from 'lucide-react';
import { BpmnModel } from '../../types/process';
import { bpmnDiagramsRecord } from '../../data/bpmn-diagrams';
import { Badge } from '../common/Badge';

interface BpmnViewerProps {
  processCode: string;
  bpmn: BpmnModel;
  defaultMode?: 'to-be' | 'as-is' | 'compare';
}

export const BpmnViewer: React.FC<BpmnViewerProps> = ({
  processCode,
  bpmn,
  defaultMode = 'to-be',
}) => {
  const [viewMode, setViewMode] = useState<'to-be' | 'as-is' | 'compare'>(defaultMode);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewFormat, setViewFormat] = useState<'image' | 'svg'>('image');

  const viewportRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const hasOfficialImages = Boolean(bpmn.asIsImage || bpmn.toBeImage);

  const diagrams = bpmnDiagramsRecord[processCode] || {
    asIsSvg: `<svg viewBox="0 0 800 400"><text x="50%" y="50%" text-anchor="middle">Diagrama AS-IS em elaboração</text></svg>`,
    toBeSvg: `<svg viewBox="0 0 800 400"><text x="50%" y="50%" text-anchor="middle">Diagrama TO-BE em elaboração</text></svg>`,
  };

  // Reset zoom & pan when switching process or mode
  const handleReset = useCallback(() => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    handleReset();
  }, [processCode, viewMode, handleReset]);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 4.0));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0.4));

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15;
    setZoomLevel((prev) => {
      const next = Math.min(Math.max(Number((prev + zoomFactor).toFixed(2)), 0.4), 4.0);
      return next;
    });
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only allow left click drag
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch pan handlers for tablets & mobiles
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPosition({
      x: e.touches[0].clientX - dragStart.x,
      y: e.touches[0].clientY - dragStart.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ${
        isFullscreen ? 'p-4 fixed inset-0 z-50 rounded-none bg-slate-900 text-white h-screen' : ''
      }`}
    >
      {/* Top Toolbar */}
      <div
        className={`flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b select-none ${
          isFullscreen ? 'border-slate-800 bg-slate-950' : 'border-slate-100 bg-slate-50/80'
        }`}
      >
        {/* View Mode Toggle (TO-BE, AS-IS, Comparar) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl">
          <button
            onClick={() => setViewMode('to-be')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'to-be'
                ? 'bg-iffar-green text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>TO-BE (Proposto)</span>
          </button>

          <button
            onClick={() => setViewMode('as-is')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'as-is'
                ? 'bg-iffar-red text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>AS-IS (Atual / Gargalos)</span>
          </button>

          <button
            onClick={() => setViewMode('compare')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              viewMode === 'compare'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Comparar Lado a Lado</span>
          </button>
        </div>

        {/* Official Bizagi Image Badge */}
        {hasOfficialImages && (
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-bold text-[11px]">
              <ImageIcon className="w-3 h-3 text-iffar-green" />
              Modelagem Oficial Bizagi Modeler
            </span>
          </div>
        )}

        {/* Lead Time Metrics Pills */}
        <div className="hidden md:flex items-center gap-2 text-xs">
          <span className="text-slate-500">Lead Time:</span>
          <Badge variant={viewMode === 'as-is' ? 'red' : 'green'} size="sm">
            {viewMode === 'as-is' ? bpmn.keyMetrics.asIsLeadTime : bpmn.keyMetrics.toBeLeadTime}
          </Badge>
          <Badge variant="blue" size="sm">
            Ganho: {bpmn.keyMetrics.reductionPercent}
          </Badge>
        </div>

        {/* Zoom & Pan Controls */}
        <div className="flex items-center gap-1 bg-white/80 border border-slate-200 rounded-xl p-1 shadow-2xs">
          <button
            onClick={handleZoomOut}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Reduzir Zoom (-)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="px-2 py-1 text-xs font-mono font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer min-w-[50px] text-center"
            title="Redefinir Posição e Zoom (100%)"
          >
            {Math.round(zoomLevel * 100)}%
          </button>

          <button
            onClick={handleZoomIn}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Aumentar Zoom (+)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Centralizar / Resetar Posição"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer ml-0.5 border-l border-slate-200"
            title={isFullscreen ? 'Sair da Tela Cheia' : 'Visualizar em Tela Cheia'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Helper Navigation Hint Bar */}
      <div className="px-5 py-1.5 bg-slate-100/70 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500 select-none">
        <div className="flex items-center gap-2">
          <Move className="w-3.5 h-3.5 text-iffar-green" />
          <span>
            <strong>Navegação Interativa:</strong> Clique e arraste com o mouse para movimentar o diagrama • Use a roda do mouse (scroll) para dar zoom.
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-slate-400">
          <span>Escala: {zoomLevel}x</span>
          <span>•</span>
          <span>Pos: ({Math.round(position.x)}, {Math.round(position.y)})</span>
        </div>
      </div>

      {/* Interactive Pan & Zoom Canvas */}
      <div
        ref={viewportRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative overflow-hidden flex items-center justify-center bg-slate-100/50 select-none ${
          isFullscreen ? 'flex-1 h-full' : 'min-h-[520px] max-h-[680px]'
        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      >
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none"></div>

        {/* Transform Container with Pan (x,y) & Zoom (scale) */}
        <div
          className="transition-transform duration-75 origin-center will-change-transform flex items-center justify-center p-8"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
          }}
        >
          {/* TO-BE VIEW */}
          {viewMode === 'to-be' && (
            <div className="flex flex-col items-center justify-center pointer-events-auto">
              {bpmn.toBeImage ? (
                <div className="bg-white p-3 rounded-2xl shadow-lg border border-slate-200/90 max-w-4xl">
                  <img
                    src={bpmn.toBeImage}
                    alt="Diagrama BPMN TO-BE - Atendimento de Chamados"
                    className="max-h-[540px] w-auto object-contain rounded-xl select-none"
                    draggable={false}
                  />
                  <div className="mt-2 text-center text-[11px] font-bold text-emerald-800 bg-emerald-50 py-1 px-3 rounded-lg flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-iffar-green" />
                    <span>Diagrama Proposto (TO-BE) • Notação BPMN 2.0 (Bizagi Modeler)</span>
                  </div>
                </div>
              ) : (
                <div
                  className="w-full max-w-4xl bg-white p-4 rounded-2xl shadow-md border border-slate-200"
                  dangerouslySetInnerHTML={{ __html: diagrams.toBeSvg }}
                />
              )}
            </div>
          )}

          {/* AS-IS VIEW */}
          {viewMode === 'as-is' && (
            <div className="flex flex-col items-center justify-center pointer-events-auto">
              {bpmn.asIsImage ? (
                <div className="bg-white p-3 rounded-2xl shadow-lg border border-slate-200/90 max-w-4xl">
                  <img
                    src={bpmn.asIsImage}
                    alt="Diagrama BPMN AS-IS - Atendimento de Chamados"
                    className="max-h-[540px] w-auto object-contain rounded-xl select-none"
                    draggable={false}
                  />
                  <div className="mt-2 text-center text-[11px] font-bold text-red-800 bg-red-50 py-1 px-3 rounded-lg flex items-center justify-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-iffar-red" />
                    <span>Diagrama Atual (AS-IS) com Gargalos Mapeados • Notação BPMN 2.0 (Bizagi Modeler)</span>
                  </div>
                </div>
              ) : (
                <div
                  className="w-full max-w-4xl bg-white p-4 rounded-2xl shadow-md border border-slate-200"
                  dangerouslySetInnerHTML={{ __html: diagrams.asIsSvg }}
                />
              )}
            </div>
          )}

          {/* COMPARE SIDE-BY-SIDE VIEW */}
          {viewMode === 'compare' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-6xl pointer-events-auto">
              {/* Left: AS-IS */}
              <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-red-200 flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs font-bold text-red-800 bg-red-50 py-1.5 px-3 rounded-xl mb-3">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-iffar-red" />
                    Estado Atual (AS-IS)
                  </span>
                  <Badge variant="red" size="sm">Gargalos</Badge>
                </div>
                {bpmn.asIsImage ? (
                  <img
                    src={bpmn.asIsImage}
                    alt="AS-IS Bizagi"
                    className="max-h-[460px] w-auto object-contain rounded-lg select-none"
                    draggable={false}
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: diagrams.asIsSvg }} />
                )}
              </div>

              {/* Right: TO-BE */}
              <div className="bg-white p-4 rounded-2xl shadow-md border-2 border-emerald-200 flex flex-col items-center">
                <div className="w-full flex items-center justify-between text-xs font-bold text-emerald-800 bg-emerald-50 py-1.5 px-3 rounded-xl mb-3">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-iffar-green" />
                    Estado Proposto (TO-BE)
                  </span>
                  <Badge variant="green" size="sm">Otimizado</Badge>
                </div>
                {bpmn.toBeImage ? (
                  <img
                    src={bpmn.toBeImage}
                    alt="TO-BE Bizagi"
                    className="max-h-[460px] w-auto object-contain rounded-lg select-none"
                    draggable={false}
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: diagrams.toBeSvg }} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BPMN Notation Legend Bar */}
      <div className="px-6 py-2.5 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-3 select-none">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-semibold text-slate-700">Legenda BPMN 2.0:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-emerald-600 bg-emerald-100 inline-block"></span>
            Evento de Início
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-3 rounded border border-blue-500 bg-blue-50 inline-block"></span>
            Tarefa de Usuário
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rotate-45 border border-amber-600 bg-amber-50 inline-block"></span>
            Gateway Exclusivo (X)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border-2 border-iffar-green bg-emerald-200 inline-block"></span>
            Evento de Fim
          </span>
        </div>
        <div className="font-mono text-slate-400">Bizagi Modeler • OMG BPMN 2.0</div>
      </div>
    </div>
  );
};
