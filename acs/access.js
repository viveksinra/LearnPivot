const accessControl = [
  {
    "policies": [
      {
        "role": "careTaker",
        "permissions": [
          {
            "resource": "payment",
            "actions": ['find', 'create', 'edit'],
            "specialPolicies": ['fieldname:action']
          }
        ]
      }
      // other policies
    ]
  }
  ];
  
  export function canAccess(role, className, action) {
    if (!role) return false;
    let access = false;
    accessControl.forEach((a) => {
      if (a.class === className) {
        for (const key in a.permissions) {
          if (key === role) {
            if (action) {
              if (
                a.permissions[key].includes("*") ||
                a.permissions[key].includes(action)
              ) {
                access = true;
              }
            } else if (a.permissions[key].length) {
              access = true;
            }
          }
        }
      }
    });
    return access;
  }