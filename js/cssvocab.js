$(document).ready(function() {
  var vocab = [
    {
      'tokenName': 'comment',
      'humanName': 'Commentaire',
      'url': ''
    },
    {
      'tokenName': 'statement',
      'humanName': 'Déclaration',
      'url': ''
    },
    {
      'tokenName': 'rule-set',
      'humanName': 'Ensemble de règles',
      'url': ''
    },
    {
      'tokenName': 'at-rule',
      'humanName': 'Règle @',
      'url': ''
    },
    {
      'tokenName': 'media-query',
      'humanName': 'Requête média (Media query)',
      'url': ''
    },
    {
      'tokenName': 'media-query-list',
      'humanName': 'Liste de requête média (media query)',
      'url': ''
    },

    {
      'tokenName': 'media-type',
      'humanName': 'Type de média',
      'url': ''
    },
    {
      'tokenName': 'expression',
      'humanName': 'Expression',
      'url': ''
    },
    {
      'tokenName': 'media-feature',
      'humanName': 'Caractéristique du Média',
      'url': ''
    },
    {
      'tokenName': 'block',
      'humanName': 'Bloc',
      'url': ''
    },
    {
      'tokenName': 'declaration-block',
      'humanName': 'Bloc de déclaration',
      'url': ''
    },
    {
      'tokenName': 'selector',
      'humanName': 'Sélecteur',
      'url': ''
    },
    {
      'tokenName': 'simple-selector',
      'humanName': 'Simple sélecteur',
      'url': ''
    },
    {
      'tokenName': 'type-selector',
      'humanName': 'Sélecteur de type',
      'url': ''
    },
    {
      'tokenName': 'universal-selector',
      'humanName': 'Sélecteur universel',
      'url': ''
    },
    {
      'tokenName': 'id-selector',
      'humanName': 'Sélecteur d\'Id',
      'url': ''
    },
    {
      'tokenName': 'class-selector',
      'humanName': 'Sélecteur de classe',
      'url': ''
    },
    {
      'tokenName': 'attribute-selector',
      'humanName': 'Sélecteur d\'attribut',
      'url': ''
    },
    {
      'tokenName': 'pseudo-class',
      'humanName': 'Pseudo-classe',
      'url': ''
    },
    {
      'tokenName': 'pseudo-element',
      'humanName': 'Pseudo-élément',
      'url': ''
    },
    {
      'tokenName': 'combinator',
      'humanName': 'Combinateur',
      'url': ''
    },
    {
      'tokenName': 'descendant-combinator',
      'humanName': 'Combinateur descendant',
      'url': ''
    },
    {
      'tokenName': 'child-combinator',
      'humanName': 'Combinateur enfant',
      'url': ''
    },
    {
      'tokenName': 'adjacent-sibling-combinator',
      'humanName': 'Combinateur adjacent de même parent (premier élément)',
      'url': ''
    },
    {
      'tokenName': 'general-sibling-combinator',
      'humanName': 'Combinateur adjacent de même parent',
      'url': ''
    },
    {
      'tokenName': 'declaration',
      'humanName': 'Déclaration',
      'url': ''
    },
    {
      'tokenName': 'property',
      'humanName': 'Propriété',
      'url': ''
    },
    {
      'tokenName': 'value',
      'humanName': 'Valeur',
      'url': ''
    },
    {
      'tokenName': 'function',
      'humanName': 'Fonction',
      'url': ''
    },
    {
      'tokenName': 'keyword',
      'humanName': 'Mot-clé',
      'url': ''
    },
    /*{
      'tokenName': 'identifier',
      'humanName': 'Identifier',
      'url': ''
    },*/
    {
      'tokenName': 'string',
      'humanName': 'Chaîne',
      'url': ''
    },
    {
      'tokenName': 'url',
      'humanName': 'URL',
      'url': ''
    },
    {
      'tokenName': 'number',
      'humanName': 'Nombre',
      'url': ''
    },
    {
      'tokenName': 'percentage',
      'humanName': 'Pourcentage',
      'url': ''
    },
    {
      'tokenName': 'length',
      'humanName': 'Longueur',
      'url': ''
    },
    {
      'tokenName': 'unit',
      'humanName': 'Unité',
      'url': ''
    },
    {
      'tokenName': 'color',
      'humanName': 'Couleur',
      'url': ''
    },
    {
      'tokenName': 'vendor-prefix',
      'humanName': 'Préfixe CSS du navigateur',
      'url': ''
    },
  ];

  //Build vocab list in the sidebar
  function buildVocabList (vocab) {
    for (var i = 0; i < vocab.length; i++) {
      text = vocab[i].humanName;
      token = vocab[i].tokenName;
      $('.vocabList').append('<li class="'+token+'" tabindex="0">'+text+'</li>');
    }
  }
  buildVocabList(vocab);

  /*
    build css selectors that select:
    - all tokens in the app
    - tokens in css panel and
    - tokens in vocabList
  */
  function buildSelectors (obj) {
    var all = '';
    var css = '';
    var vocab = '';
    obj.forEach(function (item, i, obj) {
      var name = item.tokenName;
      all = all + '.' + name + ',';
      css = css + '.css .' + name + ',';
      vocab = vocab + '.vocabList .' + name + ',';
    });
    // Remove the trailing comma in each selector string
    all = all.slice(0, -1);
    css = css.slice(0, -1);
    vocab = vocab.slice(0, -1);
    return {'allTokens': all, 'cssTokens': css, 'vocabTokens': vocab};
  }
  var selectors = buildSelectors(vocab);

  $(selectors.cssTokens).on('mouseover', function(event) {
    event.stopPropagation();
    $('.hover').removeClass('hover');
    $(this).addClass('hover');
  });

  $(selectors.cssTokens).on('focus click', function(event) {
    event.stopPropagation();

    $('.content').addClass('focus');
    $('.sidebar').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var pals = whatIsThis.split(' ');
    var $cssPals = $('.css ' + '.' + pals.join('.'));
    var vocabPalsSelector = '.vocabList .' + pals.join(', .vocabList .');
    $vocabPals = $(vocabPalsSelector);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
    $vocabPals.addClass('selected');
  });

  $(selectors.vocabTokens).on('focus click', function(event) {
    event.stopPropagation();

    $('.sidebar').addClass('focus');
    $('.content').removeClass('focus');

    var whatIsThis = $(this).attr('class');
    whatIsThis = whatIsThis.replace('hover', '').replace('hilite', '').replace('selected', '').replace('  ', '').trim();
    var $cssPals = $('.css .' + whatIsThis);

    $('.hilite').removeClass('hilite');
    $('.selected').removeClass('selected');
    $cssPals.addClass('hilite');
    $(this).addClass('selected');
  });

  $(selectors.allTokens).attr('tabindex', '0');
  //$('.vocabList .property').focus();

  key('up', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.prev().focus();
    }
  });
  key('down', function(event){
    var vocabFocus = $('.vocabList :focus');
    if (vocabFocus.length > 0) {
      event.preventDefault();
      vocabFocus.next().focus();
    }
  });

  $('.sidebar-hide-btn').on('click touchstart', function(event) {
    event.preventDefault();
    $('body').addClass('sidebar-hide');
  });
  $('.sidebar-show-btn').on('click touchstart', function(event) {
    event.preventDefault();
    $('body').removeClass('sidebar-hide');
  });

});
