using TrillionBitsPortal.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TrillionBitsPortal.ResourceTracker.Models
{
    [Serializable]
    public abstract class BaseModel : IModelState
    {
        private ModelState state;
        [Key]
        [JsonProperty("Id")]
        public virtual int Id { get; set; }
        [NotMapped]
        public int TotalRows { get; set; }

        public Dictionary<string, object> GetParameterInfo
        {
            get;
            set;
        }

        [Browsable(false)]
        public bool IsAdded
        {
            get
            {
                return this.state.Equals(ModelState.Added);
            }
        }

        [Browsable(false)]
        public bool IsDeleted
        {
            get
            {
                return this.state.Equals(ModelState.Deleted);
            }
        }

        [Browsable(false)]
        public bool IsDetached
        {
            get
            {
                return this.state.Equals(ModelState.Detached);
            }
        }

        [Browsable(false)]
        public bool IsModified
        {
            get
            {
                return this.state.Equals(ModelState.Modified);
            }
        }

        [Browsable(false)]
        public bool IsUnchanged
        {
            get
            {
                return this.state.Equals(ModelState.Unchanged);
            }
        }

        [Browsable(false)]
        [NotMapped]
        public ModelState ModelState
        {
            get
            {
                return this.state;
            }
            set
            {
                this.state = value;
            }
        }

        protected BaseModel()
        {
        }

        public T Copy<T>()
        {
            return (T)this.MemberwiseClone();
        }

        protected bool PropertyChanged<T>(T oldValue, T newValue)
        {
            if (!oldValue.NotEquals<T>(newValue))
            {
                return false;
            }
            if (this.IsUnchanged)
            {
                this.SetModified();
            }
            return true;
        }

        public void SetAdded()
        {
            this.state = ModelState.Added;
        }

        public void SetDeleted()
        {
            this.state = (this.IsAdded ? ModelState.Detached : ModelState.Deleted);
        }

        public void SetDetached()
        {
            this.state = ModelState.Detached;
        }

        public void SetModified()
        {
            this.state = ModelState.Modified;
        }

        public void SetUnchanged()
        {
            this.state = ModelState.Unchanged;
        }

        public override string ToString()
        {
            return string.Format("Name = {0}, State = {1}", this.GetType().Name, this.state);
        }
    }
}
