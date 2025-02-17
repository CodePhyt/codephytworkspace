import React, { useEffect, useRef } from 'react';
import ForceGraph3D from '3d-force-graph';
import { motion } from 'framer-motion';
import '../styles/AIToolsNetwork.css';

const toolsData = {
  nodes: [
    { id: 'autogen', group: 'core', val: 20, label: 'Autogen', status: 'production' },
    { id: 'fluxpro', group: 'core', val: 20, label: 'Flux Pro 1.1 Ultra', category: 'audio' },
    { id: 'huggingface', group: 'core', val: 20, label: 'Hugging Face', status: 'connected' },
    { id: 'beeagent', group: 'framework', val: 15, label: 'Bee Agent' },
    { id: 'crewai', group: 'framework', val: 15, label: 'CrewAI' },
    { id: 'praisonai', group: 'framework', val: 15, label: 'PraisonAI' },
    { id: 'docker', group: 'infra', val: 15, label: 'Docker' },
    { id: 'v0dev', group: 'infra', val: 15, label: 'v0.dev' },
    { id: 'replit', group: 'infra', val: 15, label: 'Replit' },
    { id: 'omniparser', group: 'experimental', val: 10, label: 'OmniParser' },
    { id: 'augmentcode', group: 'experimental', val: 10, label: 'Augmentcode' },
    { id: 'uitars', group: 'experimental', val: 10, label: 'UI-TARS' }
  ],
  links: [
    { source: 'autogen', target: 'beeagent', value: 1 },
    { source: 'autogen', target: 'crewai', value: 1 },
    { source: 'fluxpro', target: 'huggingface', value: 1 },
    { source: 'huggingface', target: 'praisonai', value: 1 },
    { source: 'beeagent', target: 'docker', value: 1 },
    { source: 'crewai', target: 'v0dev', value: 1 },
    { source: 'praisonai', target: 'replit', value: 1 },
    { source: 'docker', target: 'omniparser', value: 1 },
    { source: 'v0dev', target: 'augmentcode', value: 1 },
    { source: 'replit', target: 'uitars', value: 1 }
  ]
};

const AIToolsNetwork = () => {
  const containerRef = useRef();
  const graphRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 500;

    const Graph = ForceGraph3D()
      .width(width)
      .height(height)
      .backgroundColor('#1a1a1a')
      .nodeLabel('label')
      .nodeColor(node => {
        switch(node.group) {
          case 'core': return '#4ecdc4';
          case 'framework': return '#ff6b6b';
          case 'infra': return '#ffe66d';
          case 'experimental': return '#7c5cbf';
          default: return '#999';
        }
      })
      .nodeVal('val')
      .linkWidth(2)
      .linkColor(() => '#ffffff30')
      .graphData(toolsData);

    graphRef.current = Graph(containerRef.current);

    // Add camera animation
    let angle = 0;
    setInterval(() => {
      const distance = 200;
      graphRef.current.cameraPosition({
        x: distance * Math.sin(angle),
        z: distance * Math.cos(angle)
      });
      angle += 0.002;
    }, 10);

    return () => {
      graphRef.current && graphRef.current._destructor();
    };
  }, []);

  return (
    <motion.section
      className="ai-tools-network"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h2>AI Tools Network</h2>
      <div className="graph-container" ref={containerRef}></div>
      <div className="legend">
        <div className="legend-item">
          <span className="color-dot core"></span>
          <span>Core Tools</span>
        </div>
        <div className="legend-item">
          <span className="color-dot framework"></span>
          <span>Frameworks</span>
        </div>
        <div className="legend-item">
          <span className="color-dot infra"></span>
          <span>Infrastructure</span>
        </div>
        <div className="legend-item">
          <span className="color-dot experimental"></span>
          <span>Experimental</span>
        </div>
      </div>
    </motion.section>
  );
};

export default AIToolsNetwork;
