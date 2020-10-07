Xaprb.InputMask = {

   /* Each mask has a format and regex property.  The format consists
    * of spaces and non-spaces.  A space is a placeholder for a value the user
    * enters.  A non-space is a literal character that gets copied to that
    * position in the value.  The regex is used to validate each character, one
    * at a time (it is not applied against the entire value in the form field,
    * just the characters the user enters).
    *
    * The way you name your masks is significant.  If you create a mask called
    * date_us, you cause it to be applied to a form field by a) adding the
    * input_mask class to that form field, which triggers this script to treat
    * it specially, and b) adding the class mask_date_us to the form field,
    * which causes this script to apply the date_us mask to it.
    */
   masks: {
      date_iso: {
         format: '    -  -  ',
         regex:  /\d/
      },
      date_us: {
         format: '  /  /    ',
         regex:  /\d/
      },
      time: {
         format: '  :  :  ',
         regex:  /\d/
      },
      phone: {
         format: '(   )   -    ',
         regex:  /\d/
      },
      ssn: {
         format: '   -  -    ',
         regex:  /\d/
      },
      visa: {
         format: '    -    -    -    ',
         regex:  /\d/
      }
   },

   /* Finds every element with class input_mask and applies masks to them.
    */
   setupElementMasks: function() {
      if ( document.getElementsByClassName ) { // Requires the Prototype library
         document.getElementsByClassName('input_mask').each(function(item) {
            Event.observe(item, 'keypress',
               Xaprb.InputMask.applyMask.bindAsEventListener(item), true);
         });
      }
   },
   

   /* This is triggered when the key is pressed in the form input.  It is
    * bound to the element, so 'this' is the input element.
    */
   applyMask: function(event) {
      var match = /mask_(\w+)/.exec(this.className);
      if ( match.length == 2 && Xaprb.InputMask.masks[match[1]] ) {
         var mask = Xaprb.InputMask.masks[match[1]];
         var key  = Xaprb.InputMask.getKey(event);

         if ( Xaprb.InputMask.isPrintable(key) ) {
            var ch      = String.fromCharCode(key);
            var str     = this.value + ch;
            var pos     = str.length;
            if ( mask.regex.test(ch) && pos <= mask.format.length ) {
               if ( mask.format.charAt(pos - 1) != ' ' ) {
                  str = this.value + mask.format.charAt(pos - 1) + ch;
               }
               this.value = str;
            }
            Event.stop(event);
         }
      }
   },

   /* Returns true if the key is a printable character.
    */
   isPrintable: function(key) {
      return ( key >= 32 && key < 127 );
   },

   /* Returns the key code associated with the event.
    */
   getKey: function(e) {
      return window.event ? window.event.keyCode
           : e            ? e.which
           :                0;
   }
};
