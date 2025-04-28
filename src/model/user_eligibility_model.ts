export interface IUserEligibleModel {
    id:           number;
    license:      string;
    license_type: string;
    state:        string;
    carrier:      string;
    status:       number;
    status_lable: string;
    created_at:   Date;
    updated_at:   Date;
    user_id:      number;
    carrier_id:   string;
    aor:          string;
    blacklist:    number;
}