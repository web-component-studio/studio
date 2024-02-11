const primitivesRegex = new RegExp('^(?:(?!\b(string|number)\b).)*$', 'i');

const isAClassDeclWithAttrs = (decl) => decl.kind === 'class' && decl.attributes && Array.isArray(decl.attributes);
const isUnionType = (attrTypeText) => attrTypeText.includes('|') && primitivesRegex.test(attrTypeText.replace(/(["'\s]+)/g, ''));
const unionTypeToArray = (unionTypeString) => unionTypeString.replace(/(["'\s]+)/g, '').split('|').filter(type => type !== 'undefined');

export const parseManifest = (manifestContents, classFilter) => {

  const declarations = manifestContents.modules.reduce((acc, module) => {
    let filterPredicate = (decl) => isAClassDeclWithAttrs(decl);
    if(classFilter) {
      const regex = new RegExp(classFilter);
      filterPredicate = (decl) => regex.test(decl) && isAClassDeclWithAttrs(decl);
    }
    const classDecls = module.declarations.filter(filterPredicate);
    if(classDecls.length > 0) {
      acc.push(classDecls.map(decl => {
        return { tagName: decl.tagName, attrs: parseManifestAttrs(decl.attributes)};
      }));
    }
    return acc;
  }, []);
  console.log(declarations.flat())
  const hints = {};
  declarations.flat().forEach((typeDef) => {
    hints[typeDef.tagName] ??= {};
    hints[typeDef.tagName].attrs = typeDef.attrs;
  });
  return declarations.flat();
};

export const parseManifestAttrs = (manifestAttrArray) => {
  const formattedAttributes = {};


  manifestAttrArray.forEach((attr) => {
    if(!formattedAttributes[attr.name]) {
      if(attr.type) {
        if(attr.type.text === 'boolean' || attr.type.text.includes('boolean')) {
          // boolean attribute
          formattedAttributes[attr.name] = true;
        } else if(attr.type && isUnionType(attr.type.text)) {
          // string attr with defined values
          formattedAttributes[attr.name] = unionTypeToArray(attr.type.text);
        } else {
          // free-form string attribute with any value
          formattedAttributes[attr.name] = null;
        }
      } else {
        // free-form string attribute with any value
        formattedAttributes[attr.name] = null;
      }
    }
  });
  return formattedAttributes;
};
