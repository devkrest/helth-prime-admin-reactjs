export interface IEligibilityModel {
  id:                      number;
  user_id:                 number;
  carrier_id:              string;
  license:                 string;
  license_type_id:         number;
  aor_id:                  number;
  appointment_id:          number;
  is_aor_ok:               number;
  is_black_list:           number;
  is_click_able:           number;
  created_at:              Date;
  updated_at:              Date;
  status:                  number;
  state:                   string;
  carrier_name:            string;
  aor_name:                string;
  appointment_status_name: string;
  license_type_name:       string;
  state_name:       string;
}
