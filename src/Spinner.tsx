/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

interface SpinnerProps {
    active: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({active = true}) => {
    return (
        <div
            className={['spinner', active && 'spinner--active'].join(' ')}
            role="progressbar"
            aria-busy={active ? 'true' : 'false'}
        />
    );
};

export default Spinner;
