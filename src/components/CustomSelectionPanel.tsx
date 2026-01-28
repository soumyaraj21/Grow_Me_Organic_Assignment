// Overlay panel component for custom bulk row selection

import { useState, useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import './CustomSelectionPanel.css';

interface CustomSelectionPanelProps {
    onSubmit: (count: number) => void;
}

export const CustomSelectionPanel: React.FC<CustomSelectionPanelProps> = ({ onSubmit }) => {
    const [selectCount, setSelectCount] = useState<number | null>(null);
    const overlayRef = useRef<OverlayPanel>(null);

    const handleSubmit = () => {
        if (selectCount && selectCount > 0) {
            // Pass the count to parent - the selection logic handles the rest
            onSubmit(selectCount);
            setSelectCount(null);
            overlayRef.current?.hide();
        } else {
            alert('Please enter a valid positive number');
        }
    };

    const handleCancel = () => {
        setSelectCount(null);
        overlayRef.current?.hide();
    };

    return (
        <>
            <Button
                label="Custom Select"
                onClick={(e) => overlayRef.current?.toggle(e)}
                className="custom-select-btn"
                outlined
                size="small"
            />
            <OverlayPanel ref={overlayRef} className="custom-selection-panel">
                <div className="selection-panel-content">
                    <label className="selection-label">Number of rows to select:</label>
                    <InputNumber
                        value={selectCount}
                        onValueChange={(e) => setSelectCount(e.value ?? null)}
                        placeholder="Enter number"
                        min={1}
                        max={200000}
                        className="selection-input"
                    />
                    <div className="button-group">
                        <Button
                            label="Submit"
                            onClick={handleSubmit}
                            size="small"
                            className="submit-btn"
                        />
                        <Button
                            label="Cancel"
                            onClick={handleCancel}
                            outlined
                            size="small"
                            className="cancel-btn"
                        />
                    </div>
                </div>
            </OverlayPanel>
        </>
    );
};
