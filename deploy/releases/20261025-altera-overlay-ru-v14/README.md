# Altera Russian overlay correction

Only the overlay language attribute and its serialized React prop change to Russian. The case body stays English. CSS/JavaScript versions and all other runtime bytes stay unchanged.

For restoration, use the immutable base referenced by the previous v13 package, apply its runtime delta, then overwrite runtime/ with this one HTML file. The source parent is a85706e0064d0619328a6be4a8ce2b9d2797c5d9. No site rebuild is required. The complete 47-file current runtime ZIP is created separately after verified publication, with regenerated manifests rather than copied v13 current-state metadata.
