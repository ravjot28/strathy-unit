import React from 'react';
/**
 * Stats Component - to illustrate the possible functions
 * Could be used for nav buttons or overview
 */
const Stats = ({
    currentStep,
    firstStep,
    goToStep,
    lastStep,
    nextStep,
    previousStep,
    totalSteps,
}) => (
    <div>
        <hr />
        { currentStep > 1 &&
            <button className='btn btn-default btn-block' onClick={previousStep}>Go Back</button>
        }
        {
            currentStep === totalSteps ? <button className='btn btn-success btn-block' onClick={nextStep}>Finish</button> : undefined
        }
        { currentStep < totalSteps ?
            <button className='btn btn-primary btn-block' onClick={nextStep}>Next</button>
            : undefined    
        }
        
    </div>
);

export default Stats;

/*/*<hr />
        <div style={{ fontSize: '21px', fontWeight: '200' }}>
            <h4>Other Functions</h4>
            <div>Current Step: {currentStep}</div>
            <div>Total Steps: {totalSteps}</div>
            <button className='btn btn-block btn-default' onClick={firstStep}>First Step</button>
            <button className='btn btn-block btn-default' onClick={lastStep}>Last Step</button>
            <button className='btn btn-block btn-default' onClick={() => goToStep(2)}>Go to Step 2</button>
        </div>*/