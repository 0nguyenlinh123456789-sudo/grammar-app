// File: src/pages/VocabOxfordPage.jsx
import OxfordVocab from '../components/unitData';

const VocabOxfordPage = ({ selectedUnit, completedMilestones, completeMilestone }) => {
  return (
    <div className="w-full h-full max-w-6xl mx-auto">
      <OxfordVocab 
        unitData={selectedUnit} 
        completedMilestones={completedMilestones}
        completeMilestone={completeMilestone}
      />
    </div>
  );
};

export default VocabOxfordPage;
