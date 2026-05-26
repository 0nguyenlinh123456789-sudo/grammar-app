// File: src/pages/VocabOxfordPage.jsx
import React from 'react';
import OxfordVocab from '../components/unitData';

const VocabOxfordPage = ({ selectedUnit }) => {
  return (
    <div className="w-full h-full max-w-6xl mx-auto">
      <OxfordVocab unitData={selectedUnit} />
    </div>
  );
};

export default VocabOxfordPage;
