import * as React from 'react';

interface Props {
    base64Pdf: string;
    width: string;
    height: string;
}

export const PDFViewer:React.FunctionComponent<Props> = props => {

    const {
        base64Pdf,
        width,
        height
    } = props

    return (
        <div>
            <object type='application/pdf' width={width} height={height} data={`data:application/pdf;base64,${base64Pdf}`}>
                
            </object>
            <p style={{marginLeft:'10px'}}>Haz click <a download='file.pdf' href={`data:application/octet-stream;base64,${base64Pdf}`}>aquí</a> para descargar el archivo PDF
            </p>
        </div>
    );
}


