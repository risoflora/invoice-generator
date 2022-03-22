const saveInvoice = (invoice) => chrome.storage.sync.set({ invoice });

const loadInvoice = async () => {
  const { invoice } = await chrome.storage.sync.get(['invoice']);
  return invoice || {};
};

export { saveInvoice, loadInvoice };
