import React from 'react'
import { ReactComponent as Complete } from '../../src/assets/complete.svg'
import { ReactComponent as Incomplete } from '../../src/assets/incomplete.svg'

interface Props {
    progress: string
    onClick: () => void;
}

export default function CheckContainer({ progress, onClick }: Props) {

    const checkMark = (width: string) => progress === 'complete' ? <Complete className={width} /> : <Incomplete className={width} />

    return (
        <button onClick={onClick}>
            {checkMark('w-8')}
        </button>
    )

}
