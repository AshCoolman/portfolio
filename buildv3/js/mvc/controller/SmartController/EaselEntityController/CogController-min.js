App.CogController=App.EslEntityController.extend({label:"cog",className:"CogController",view_didInsertElement:function(a){this._super(a);App.eventMapper.addEventListener("w2dE_GetPlans",this,this.doGetPlans)},doGetPlans:function(){console.log('{{ renderWithVars "'+this.label+'" "'+this.label.camelize()+'" x="'+this.get("view").eslObj.x+'" y="'+this.get("view").eslObj.y+'"}}')}});