export enum VolumeUnit {
    OZ = 'oz',
    ML = 'mL'
}

export namespace VolumeUnit {
    export function fromString(str: String) {
        if (!str) {
            return VolumeUnit.OZ;
        }
        switch(str.toLowerCase()) {
            case 'oz':
                return VolumeUnit.OZ;
            case 'ml':
                return VolumeUnit.ML;
        }
    }
}
