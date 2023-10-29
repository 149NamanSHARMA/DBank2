export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'checkBalance' : IDL.Func([], [IDL.Float64], ['query']),
    'createUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'loginUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    'logoutUser' : IDL.Func([], [], []),
    'topUp' : IDL.Func([IDL.Float64], [IDL.Text], []),
    'transferTo' : IDL.Func([IDL.Text, IDL.Float64], [IDL.Text], []),
    'withdraw' : IDL.Func([IDL.Float64], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
